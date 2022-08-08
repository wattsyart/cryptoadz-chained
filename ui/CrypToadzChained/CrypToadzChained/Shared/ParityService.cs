using System.Diagnostics;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Nethereum.Web3;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;

namespace CrypToadzChained.Shared
{
    public sealed class ParityService
    {
        private const string CrypToadzContractAddress = "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6";

        private readonly GifDecoder _gif;
        private readonly PngDecoder _png;
        private readonly ToadzService _service;

        public event Func<Task>? OnChangeAsync;

        public ParityService()
        {
            _gif = new GifDecoder();
            _png = new PngDecoder();
            _service = new ToadzService();
        }

        public async Task StartAsync(ParityOptions options, ParityState state, HttpClient http, string mainNetRpcUrl, string rinkebyRpcUrl, string contractAddress, bool continueOnError, ILogger? logger, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(mainNetRpcUrl))
            {
                throw new InvalidOperationException("Must provide MainNet RPC URL (Source)");
            }

            if (string.IsNullOrWhiteSpace(rinkebyRpcUrl))
            {
                throw new InvalidOperationException("Must provide Rinkeby RPC URL (Target)");
            }

            if (string.IsNullOrWhiteSpace(contractAddress))
            {
                throw new InvalidOperationException("Must provide Rinkeby RPC URL");
            }

            if (options.Source != ParitySource.Current)
            {
                throw new NotImplementedException("Parity testing currently supports BaseURI only");
            }

            if (cancellationToken.IsCancellationRequested)
                return;

            var web3 = new Web3(mainNetRpcUrl);
            var service = web3.Eth.ERC721.GetContractService(CrypToadzContractAddress);
            
            foreach (var tokenId in LUT.TokenIds)
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
                        state.Errors.Add($"No tokenURI returned for CrypToadz #{tokenId}");
                        if (!continueOnError)
                            return;
                        continue;
                    }

                    var sourceJson = await http.GetStringAsync(sourceTokenUri, cancellationToken);

                    var sourceMetadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(sourceJson);
                    if (sourceMetadata == null)
                    {
                        state.Errors.Add($"Failed to parse metadata for CrypToadz #{tokenId}");
                        if (!continueOnError)
                            return;
                        continue;
                    }

                    if (!string.IsNullOrWhiteSpace(sourceMetadata.Image))
                    {
                        var buffer = await http.GetByteArrayAsync(sourceMetadata.Image, cancellationToken);
                        TryGetImageUriFromBuffer(tokenId, buffer, out var imageUri, logger);
                        row.SourceImageUri = imageUri;
                    }
                    else
                    {
                        state.Errors.Add($"Missing metadata image URI for CrypToadz #{tokenId}");

                        if (!continueOnError)
                            return;
                        continue;
                    }

                    var targetTokenUri = await _service.GetCanonicalTokenURIAsync(tokenId, rinkebyRpcUrl, contractAddress, logger);
                    if (!string.IsNullOrWhiteSpace(targetTokenUri))
                    {
                        var targetJson =
                            Encoding.UTF8.GetString(
                                Convert.FromBase64String(targetTokenUri.Replace(Constants.JsonDataUri, "")));

                        var targetMetadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(targetJson);
                        if (targetMetadata == null)
                        {
                            state.Errors.Add($"Failed to parse target metadata for CrypToadz #{tokenId}");
                            if (!continueOnError)
                                return;
                            continue;
                        }

                        if (!string.IsNullOrWhiteSpace(targetMetadata.Image))
                        {
                            row.TargetImageUri = targetMetadata.Image;
                        }
                        else 
                        {
                            state.Errors.Add($"Missing target metadata image URI for CrypToadz #{tokenId}");

                            if (!continueOnError)
                                return;
                            continue;
                        }
                    }

                    else
                    {
                        state.Errors.Add($"Missing target tokenURI for CrypToadz #{tokenId}");

                        if (!continueOnError)
                            return;
                        continue;
                    }


                    state.Rows.Add(row);
                }
                catch (OperationCanceledException)
                {
                    state.Errors.Add("Parity check was cancelled by the user");
                    if (!continueOnError)
                        return;
                }
                catch (Exception e)
                {
                    logger?.LogInformation("Error encountered while fetching CrypToadz #{TokenId}: {Error}", tokenId, e);

                    state.Errors.Add($"Error encountered while fetching CrypToadz #{tokenId}: ${e}");
                    if (!continueOnError)
                        return;
                }
                finally
                {
                    OnChangeAsync?.Invoke();

                    if (OnChangeAsync == null)
                    {
                        logger?.LogWarning("OnChange was not registered!");
                    }
                }
            }
        }

        private void TryGetImageUriFromBuffer(uint tokenId, byte[] buffer, out string imageUri, ILogger? logger)
        {
            var isGif = IsGif(tokenId);

            var sw = Stopwatch.StartNew();

            Image image = isGif
                ? Image.Load<Rgba32>(buffer, _gif)
                : Image.Load<Rgba32>(buffer, _png);

            imageUri = isGif
                ? image.ToBase64String(GifFormat.Instance)
                : image.ToBase64String(PngFormat.Instance);

            logger?.LogInformation("Image conversion took {Elapsed}", sw.Elapsed);
        }

        private static bool IsGif(uint tokenId)
        {
            var isGif = LUT.CustomAnimationTokenIds.Contains(tokenId);
            return isGif;
        }
    }
}
