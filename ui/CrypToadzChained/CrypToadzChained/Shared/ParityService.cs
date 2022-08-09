using System.Text;
using System.Text.Json;
using System.Text.Json.JsonDiffPatch;
using System.Text.Json.JsonDiffPatch.Diffs.Formatters;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Jering.Javascript.NodeJS;
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

        private const string CrypToadzContractAddress = "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6";

        private static readonly GifDecoder Gif = new();
        private static readonly PngDecoder Png = new();
        private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull };

        public static event Func<Task>? OnChangeAsync;
        
        public static async Task StartAsync(ParityOptions options, ParityState state, HttpClient http, string mainNetRpcUrl, string onChainRpcUrl, string contractAddress, ILogger? logger, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(mainNetRpcUrl))
            {
                throw new InvalidOperationException("Must provide MainNet RPC URL (Source)");
            }

            if (string.IsNullOrWhiteSpace(onChainRpcUrl))
            {
                throw new InvalidOperationException("Must provide Rinkeby RPC URL (Target)");
            }

            if (string.IsNullOrWhiteSpace(contractAddress))
            {
                throw new InvalidOperationException("Must provide Rinkeby RPC URL");
            }

            if (options.Source != ParitySource.Arweave)
            {
                throw new NotImplementedException("Parity testing currently supports BaseURI only");
            }

            if (cancellationToken.IsCancellationRequested)
                return;

            var web3 = new Web3(mainNetRpcUrl);
            var service = web3.Eth.ERC721.GetContractService(CrypToadzContractAddress);
            var source = Enum.GetName(typeof(ParitySource), options.Source)!;

            foreach (var tokenId in GetScopeIds(options.Scope))
            {
                if (cancellationToken.IsCancellationRequested)
                    return;

                try
                {
                    var row = new ParityStateRow
                    {
                        TokenId = tokenId
                    };

                    var sourceTokenUri = await service.TokenURIQueryAsync(tokenId);
                    
                    if (string.IsNullOrWhiteSpace(sourceTokenUri))
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.TokenUri, ParityErrorMessage.ErrorFetchingTokenUri);
                        if (!options.ContinueOnError)
                            return;
                        continue;
                    }
                    else
                    {
                        if (sourceTokenUri.StartsWith("execution reverted"))
                        {
                            state.Errors.Add(source, tokenId, ParityErrorCategory.TokenUri, $"{ParityErrorMessage.ErrorFetchingTokenUri}: ${sourceTokenUri}");
                            if (!options.ContinueOnError)
                                return;
                            continue;
                        }
                    }

                    if (!Uri.TryCreate(sourceTokenUri, UriKind.Absolute, out var externalUri))
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.TokenUri, ParityErrorMessage.UriWasNotAnExternalServiceCall);
                        if (!options.ContinueOnError)
                            return;
                        continue;
                    }

                    var sourceJson = await http.GetStringAsync(externalUri, cancellationToken);

                    var sourceMetadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(sourceJson);
                    if (sourceMetadata == null)
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonMetadata);
                        if (!options.ContinueOnError)
                            return;
                        continue;
                    }

                    if (!string.IsNullOrWhiteSpace(sourceMetadata.Image))
                    {
                        if (!Uri.TryCreate(sourceMetadata.Image, UriKind.Absolute, out var externalImageUrl))
                        {
                            state.Errors.Add(source, tokenId, ParityErrorCategory.Image, ParityErrorMessage.UriWasNotAnExternalServiceCall);
                            if (!options.ContinueOnError)
                                return;
                            continue;
                        }

                        row.SourceImageUri = await GetExternalImageUriAsync(false, http, externalImageUrl, logger, cancellationToken);
                    }
                    else
                    {
                        state.Errors.Add(source, tokenId, ParityErrorCategory.Image, ParityErrorMessage.ImageUriMissingFromMetadata);
                        if (!options.ContinueOnError)
                            return;
                        continue;
                    }

                    var targetTokenUri = await ToadzService.GetCanonicalTokenURIAsync(tokenId, onChainRpcUrl, contractAddress, logger);

                    if (!string.IsNullOrWhiteSpace(targetTokenUri))
                    {
                        if (targetTokenUri.StartsWith("execution reverted"))
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.TokenUri, $"{ParityErrorMessage.ErrorFetchingTokenUri}: ${sourceTokenUri}");
                            if (!options.ContinueOnError)
                                return;
                            continue;
                        }

                        var targetJson = Encoding.UTF8.GetString(Convert.FromBase64String(targetTokenUri.Replace(Constants.JsonDataUri, "")));

                        var targetMetadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(targetJson);
                        if (targetMetadata == null)
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonMetadata);
                            if (!options.ContinueOnError)
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
                            if (!options.ContinueOnError)
                                return;
                            continue;
                        }

                        sourceMetadata.Image = null;
                        sourceMetadata.ImageData = null;
                        targetMetadata.Image = null;
                        targetMetadata.ImageData = null;

                        sourceJson = JsonSerializer.Serialize(sourceMetadata, JsonOptions);
                        targetJson = JsonSerializer.Serialize(targetMetadata, JsonOptions);

                        var sourceNode = JsonNode.Parse(sourceJson);
                        if (sourceNode == null)
                        {
                            state.Errors.Add(source, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonCompare);
                            if (!options.ContinueOnError)
                                return;
                            continue;
                        }

                        var targetNode = JsonNode.Parse(targetJson);
                        if (targetNode == null)
                        {
                            state.Errors.Add(OnChainSource, tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonCompare);
                            if (!options.ContinueOnError)
                                return;
                            continue;
                        }
                        
                        var diff = sourceNode.Diff(targetNode, new JsonPatchDeltaFormatter());
                        if (diff == null)
                        {
                            state.Errors.Add("", tokenId, ParityErrorCategory.Metadata, ParityErrorMessage.FailedToParseJsonDelta);
                            if (!options.ContinueOnError)
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
                        if (!options.ContinueOnError)
                            return;
                        continue;
                    }


                    state.Rows.Add(row);
                }
                catch (OperationCanceledException)
                {
                    state.Errors.Add("", tokenId, "", ParityErrorMessage.ParityCheckWasCancelledByTheUser);

                    if (!options.ContinueOnError)
                        return;
                }
                catch (Exception e)
                {
                    logger?.LogError("Unknown error while fetching CrypToadz #{TokenId}: {Error}", tokenId, e);

                    state.Errors.Add("", tokenId, "", $"{ParityErrorMessage.UnknownError}: {e}");
                    if (!options.ContinueOnError)
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

        public static async Task<ParityStateRow> CompareImagesAsync(ParityStateRow row, CancellationToken cancellationToken)
        {
            var source = GetImageInfo(row.SourceImageUri, cancellationToken);
            var target = GetImageInfo(row.TargetImageUri, cancellationToken);

            source.Type = ImageType.Png;
            target.Type = ImageType.Png;

            if (source.Size != target.Size)
                ResizeImage(source, target.Size);

            var sourcePath = Path.GetTempFileName();
            await File.WriteAllBytesAsync(sourcePath, Convert.FromBase64String(source.Uri), cancellationToken);

            var targetPath = Path.GetTempFileName();
            await File.WriteAllBytesAsync(targetPath, Convert.FromBase64String(target.Uri), cancellationToken);

            var deltaImagePath = Path.GetTempFileName();
            
            var badPixels = await StaticNodeJSService.InvokeFromStringAsync<int>(CompareImagesModule, args: new object[]
            {
                sourcePath,
                targetPath,
                deltaImagePath
            }, cancellationToken: cancellationToken);
            
            row.BadPixels = badPixels;
            row.DeltaImageUri = Image.Load<Rgba32>(await File.ReadAllBytesAsync(deltaImagePath, cancellationToken), Png).ToBase64String(PngFormat.Instance);
            return row;
        }

        private static ImageInfo GetImageInfo(string? imageUri, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var info = new ImageInfo();

            if (imageUri!.StartsWith(Constants.GifDataUri))
            {
                imageUri = imageUri[Constants.GifDataUri.Length..];
                info.Image = Image.Load<Rgba32>(Convert.FromBase64String(imageUri), Gif);
                info.Type = ImageType.Gif;
            }
            else if (imageUri.StartsWith(Constants.PngDataUri))
            {
                imageUri = imageUri[Constants.PngDataUri.Length..];
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

        public static uint GetScopeIdCount(ParityScope scope)
        {
            return (uint) GetScopeIds(scope).Count();
        }

        public static IEnumerable<uint> GetScopeIds(ParityScope scope)
        {
            var tokenIds = scope switch
            {
                ParityScope.All => LUT.AllTokenIds,
                ParityScope.AllGenerated => LUT.AllTokenIds.Except(LUT.CustomImageTokenIds).Except(LUT.CustomAnimationTokenIds),
                ParityScope.AllCustoms => LUT.CustomImageTokenIds.Concat(LUT.CustomAnimationTokenIds),
                ParityScope.CustomImages => LUT.CustomImageTokenIds,
                ParityScope.SmallCustomImages => LUT.CustomImageTokenIds.Except(LUT.LargeImageTokenIds),
                ParityScope.LargeCustomImages => LUT.LargeImageTokenIds,
                ParityScope.CustomAnimations => LUT.CustomAnimationTokenIds,
                ParityScope.LargeCustomAnimations => LUT.LargeAnimationTokenIds,
                ParityScope.SmallCustomAnimations => LUT.CustomAnimationTokenIds.Except(LUT.LargeAnimationTokenIds),
                _ => throw new ArgumentOutOfRangeException()
            };

            return tokenIds;
        }

        /// <summary> WARNING: This method delegates to the server currently, because it is WAY too slow running in the browser </summary>
        public static async Task<string> GetExternalImageUriAsync(bool runningOnServer, HttpClient http, Uri externalImageUri, ILogger? logger, CancellationToken cancellationToken)
        {
            var tokenId = uint.Parse(Path.GetFileNameWithoutExtension(externalImageUri.AbsolutePath));
            var buffer = await http.GetByteArrayAsync(externalImageUri, cancellationToken);
            var isGif = LUT.CustomAnimationTokenIds.Contains(tokenId);

            string imageUri;

            if (runningOnServer)
            {
                var image = isGif
                    ? Image.Load<Rgba32>(buffer, Gif)
                    : Image.Load<Rgba32>(buffer, Png);

                imageUri = isGif
                    ? image.ToBase64String(GifFormat.Instance)
                    : image.ToBase64String(PngFormat.Instance);
            }
            else
            {
                var url = externalImageUri.ToString();

                imageUri = await http.GetStringAsync($"toadz/image/?url={Uri.EscapeDataString(url)}",
                    CancellationToken.None);
            }

            return imageUri;
        }

        #region NodeJS

        private const string CompareImagesModule = @"
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const fs = require('fs');

module.exports = (callback, sourceImagePath, targetImagePath, deltaImagePath) => {

    const source = PNG.sync.read(fs.readFileSync(sourceImagePath));
    const target = PNG.sync.read(fs.readFileSync(targetImagePath));

    const { width, height } = source;
    const diff = new PNG({ width, height });
    const badPixels = pixelmatch(source.data, target.data, diff.data, width, height, { threshold: 0 });
    
    fs.writeFileSync(deltaImagePath, PNG.sync.write(diff));
    callback(null, badPixels);
}";

        #endregion
    }
}
