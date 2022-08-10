using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.JsonDiffPatch;
using System.Text.Json.JsonDiffPatch.Diffs.Formatters;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Nethereum.Web3;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace CrypToadzChained.Shared
{
    public static class ParityService
    {
        public const string OnChainSource = "On-Chain";

        private static readonly GifDecoder Gif = new();
        private static readonly PngDecoder Png = new();
        private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull };

        public static event Func<Task>? OnChangeAsync;
        
        public static async Task StartAsync(ParityOptions parityOptions, Web3Options web3Options, ParityState state, HttpClient http, ILogger? logger, CancellationToken cancellationToken)
        {
            if (parityOptions.Source == ParitySource.Mainnet && string.IsNullOrWhiteSpace(web3Options.MainnetRpcUrl))
            {
                throw new InvalidOperationException("Must provide MainNet RPC URL (Source)");
            }

            if (parityOptions.Source == ParitySource.IPFS && string.IsNullOrWhiteSpace(web3Options.IpfsUrl))
            {
                throw new InvalidOperationException("Must provide IPFS Gateway URL (Source)");
            }

            if (string.IsNullOrWhiteSpace(web3Options.OnChainContractAddress))
            {
                throw new InvalidOperationException("Must provide CrypToadzChained Contract Address");
            }

            if (string.IsNullOrWhiteSpace(web3Options.OnChainRpcUrl))
            {
                throw new InvalidOperationException("Must provide CrypToadzChained RPC URL (Target)");
            }

            if (cancellationToken.IsCancellationRequested)
                return;

            var source = Enum.GetName(typeof(ParitySource), parityOptions.Source)!;

            foreach (var tokenId in parityOptions.Scope.TokenIds())
            {
                if (cancellationToken.IsCancellationRequested)
                    return;

                try
                {
                    var row = new ParityStateRow
                    {
                        TokenId = tokenId
                    };

                    string sourceTokenUri;
                    switch (parityOptions.Source)
                    {
                        case ParitySource.IPFS:
                        {
                            var cid = $"{web3Options.IpfsCid}/{tokenId}";
                            var payload = await DownloadFromIpfsAsync(cid, http, web3Options, cancellationToken);
                            sourceTokenUri = Encoding.UTF8.GetString(payload);
                            break;
                        }
                        case ParitySource.Mainnet:
                        {
                            var web3 = new Web3(web3Options.MainnetRpcUrl);
                            var service = web3.Eth.ERC721.GetContractService(web3Options.MainnetContractAddress);
                            sourceTokenUri = await service.TokenURIQueryAsync(tokenId);
                            break;
                        }
                        default:
                            throw new NotSupportedException($"Unsupported source ({parityOptions.Source})");
                    }

                    if (string.IsNullOrWhiteSpace(sourceTokenUri))
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.TokenUri, ParityErrorMessage.MissingTokenUri);
                        if (!parityOptions.ContinueOnError)
                            return;
                        continue;
                    }
                    else
                    {
                        if (sourceTokenUri.StartsWith("execution reverted") || sourceTokenUri.StartsWith("ipfs"))
                        {
                            state.Errors.Add(source, tokenId, ParityErrorCategory.TokenUri, $"{ParityErrorMessage.ErrorFetchingTokenUri}: {sourceTokenUri}");
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }
                    }

                    string sourceJson;
                    switch (parityOptions.Source)
                    {
                        case ParitySource.Mainnet:
                            if (!Uri.TryCreate(sourceTokenUri, UriKind.Absolute, out var externalUri))
                            {
                                state.Errors.Add(source, tokenId, ParityErrorCategory.TokenUri, ParityErrorMessage.UriWasNotAnExternalServiceCall);
                                if (!parityOptions.ContinueOnError)
                                    return;
                                continue;
                            }
                            sourceJson = await http.GetStringAsync(externalUri, cancellationToken);
                            break;
                        case ParitySource.IPFS:
                            sourceJson = sourceTokenUri;
                            break;
                        default:
                            throw new NotSupportedException($"Unsupported source ({parityOptions.Source})");
                    }

                    var sourceMetadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(sourceJson);
                    if (sourceMetadata == null)
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonMetadata);
                        if (!parityOptions.ContinueOnError)
                            return;
                        continue;
                    }

                    if (!string.IsNullOrWhiteSpace(sourceMetadata.Image))
                    {
                        if (!Uri.TryCreate(sourceMetadata.Image, UriKind.Absolute, out var externalImageUrl))
                        {
                            state.Errors.Add(source, tokenId, ParityErrorCategory.Image, ParityErrorMessage.UriWasNotAnExternalServiceCall);
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }

                        var payload = parityOptions.Source switch
                        {
                            ParitySource.IPFS => await DownloadFromIpfsAsync(sourceMetadata.Image.Replace("ipfs://", ""), http, web3Options, cancellationToken),
                            ParitySource.Mainnet => await http.GetByteArrayAsync(externalImageUrl, cancellationToken), 
                            _ => throw new NotSupportedException($"Unsupported source ({parityOptions.Source})")
                        };

                        var encoded = Convert.ToBase64String(payload);
                        var imageUri = LUT.CustomAnimationTokenIds.Contains(tokenId)
                            ? $"{DataUri.Gif}{encoded}"
                            : $"{DataUri.Png}{encoded}";

                        row.SourceImageUri = imageUri;
                    }
                    else
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.Image, ParityErrorMessage.ImageUriMissingFromMetadata);
                        if (!parityOptions.ContinueOnError)
                            return;
                        continue;
                    }

                    var targetTokenUri = await ToadzService.GetCanonicalTokenURIAsync(tokenId,
                        web3Options.OnChainRpcUrl,
                        web3Options.OnChainContractAddress,
                        logger
                    );

                    if (!string.IsNullOrWhiteSpace(targetTokenUri))
                    {
                        if (targetTokenUri.StartsWith("execution reverted"))
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.TokenUri, $"{ParityErrorMessage.ErrorFetchingTokenUri}: {targetTokenUri}");
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }

                        var targetJson = Encoding.UTF8.GetString(Convert.FromBase64String(targetTokenUri.Replace(DataUri.Json, "")));
                        var targetMetadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(targetJson);
                        if (targetMetadata == null)
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonMetadata);
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }

                        if (!string.IsNullOrWhiteSpace(targetMetadata.Image))
                        {
                            row.TargetImageUri = targetMetadata.Image;
                        }
                        else 
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.Image, ParityErrorMessage.ImageUriMissingFromMetadata);
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }

                        sourceMetadata.Image = null;
                        sourceJson = JsonSerializer.Serialize(sourceMetadata, JsonOptions);

                        targetMetadata.Image = null;
                        targetJson = JsonSerializer.Serialize(targetMetadata, JsonOptions);

                        var sourceNode = JsonNode.Parse(sourceJson);
                        if (sourceNode == null)
                        {
                            state.Errors.Add(source, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonCompare);
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }

                        var targetNode = JsonNode.Parse(targetJson);
                        if (targetNode == null)
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonCompare);
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }
                        
                        var diff = sourceNode.Diff(targetNode, new JsonPatchDeltaFormatter());
                        if (diff == null)
                        {
                            state.Errors.Add("", tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonDelta);
                            if (!parityOptions.ContinueOnError)
                                return;
                            continue;
                        }

                        var deltaJson = diff.ToJsonString(JsonOptions);
                        if (!deltaJson.Equals("[]", StringComparison.Ordinal))
                        {
                            row.DeltaJson = deltaJson;
                            state.Errors.Add("", tokenId, ParityErrorCategory.Metadata, row.DeltaJson);
                        }
                    }
                    else
                    {
                        state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.TokenUri, ParityErrorMessage.ErrorFetchingTokenUri);
                        if (!parityOptions.ContinueOnError)
                            return;
                        continue;
                    }

                    state.Rows.Add(row);
                }
                catch (OperationCanceledException)
                {
                    state.Errors.Add("", tokenId, "", ParityErrorMessage.ParityCheckWasCancelledByTheUser);

                    if (!parityOptions.ContinueOnError)
                        return;
                }
                catch (Exception e)
                {
                    logger?.LogError("Unknown error while fetching CrypToadz #{TokenId}: {Error}", tokenId, e);

                    state.Errors.Add("", tokenId, "", $"{ParityErrorMessage.UnknownError}: {e}");
                    if (!parityOptions.ContinueOnError)
                        return;
                }
                finally
                {
                    OnChangeAsync?.Invoke();
                    if (OnChangeAsync == null)
                        logger?.LogWarning("OnChange was not registered!");
                }
            }
        }

        private static async Task<byte[]> DownloadFromIpfsAsync(string cid, HttpMessageInvoker http, Web3Options web3Options, CancellationToken cancellationToken)
        {
            var host = web3Options.IpfsUrl ?? "https://ipfs.io/ipfs";
            if (host.EndsWith("/"))
                host = host.TrimEnd('/');

            var requestUri = $"{host}/api/v0/cat?arg={cid}";
            var request = new HttpRequestMessage(HttpMethod.Post, requestUri);

            if (!string.IsNullOrWhiteSpace(web3Options.IpfsUsername) &&
                !string.IsNullOrWhiteSpace(web3Options.IpfsPassword))
            {
                var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{web3Options.IpfsUsername}:{web3Options.IpfsPassword}"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);
            }

            var response = await http.SendAsync(request, cancellationToken);
            var payload = await response.Content.ReadAsByteArrayAsync(cancellationToken);
            return payload;
        }

        public static ParityStateRow CompareImages(ParityStateRow row, CancellationToken cancellationToken)
        {
            var source = GetImageInfo(row.SourceImageUri, cancellationToken);
            var target = GetImageInfo(row.TargetImageUri, cancellationToken);

            if (source.FrameCount != target.FrameCount)
                throw new InvalidOperationException($"ID #{row.TokenId}: animation frame count mismatch");

            var sourceFrames = source.Image.Frames;
            var targetFrames = target.Image.Frames;
            
            var totalBadPixels = 0;
            Image<Rgba32>? lastDelta = null;

            for (var i = 0; i < sourceFrames.Count; i++)
            {
                var sourceFrame = new ImageInfo
                {
                    Image = sourceFrames.CloneFrame(i),
                    Type = ImageType.Png
                };

                var targetFrame = new ImageInfo
                {
                    Image = targetFrames.CloneFrame(i),
                    Type = ImageType.Png
                };

                if (sourceFrame.Size != targetFrame.Size)
                    ResizeImage(sourceFrame, targetFrame.Size);


                var deltaImage = sourceFrame.Image.Clone(x => 
                    x.Lightness(1.7f).Grayscale()
                );

                var badPixels = 0;

                for (var x = 0; x < sourceFrame.Image.Width; x++)
                {
                    for (var y = 0; y < sourceFrame.Image.Height; y++)
                    {
                        var sourcePixel = sourceFrame.Image[x, y];
                        var targetPixel = targetFrame.Image[x, y];
                        if (sourcePixel.Equals(targetPixel)) continue;
                        badPixels++;
                        deltaImage[x, y] = Color.Red;
                    }
                }

                totalBadPixels += badPixels;
                if (badPixels > 0 || lastDelta == null)
                    lastDelta = deltaImage;
            }

            row.BadPixels = totalBadPixels;
            row.DeltaImageUri = lastDelta.ToBase64String(PngFormat.Instance);

            return row;
        }
        
        private static ImageInfo GetImageInfo(string? imageUri, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var info = new ImageInfo();

            if (imageUri!.StartsWith(DataUri.Gif))
            {
                imageUri = imageUri[DataUri.Gif.Length..];
                info.Image = Image.Load<Rgba32>(Convert.FromBase64String(imageUri), Gif);
                info.Type = ImageType.Gif;
            }
            else if (imageUri.StartsWith(DataUri.Png))
            {
                imageUri = imageUri[DataUri.Png.Length..];
                info.Image = Image.Load<Rgba32>(Convert.FromBase64String(imageUri), Png);
                info.Type = ImageType.Png;
            }

            return info;
        }
        
        private static void ResizeImage(ImageInfo info, Size newSize)
        {
            if (info.Size == newSize)
                throw new InvalidOperationException("Image is already the requested size");
            info.Image.Mutate(x => x.Resize(new ResizeOptions { Size = newSize, Sampler = KnownResamplers.NearestNeighbor }));
        }
    }
}
