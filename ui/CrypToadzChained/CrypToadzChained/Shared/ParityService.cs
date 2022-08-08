using System.Diagnostics;
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

        public event Func<Task>? OnChangeAsync;

        public ParityService()
        {
            _gif = new GifDecoder();
            _png = new PngDecoder();
        }

        public async Task StartAsync(ParityOptions options, ParityState state, HttpClient http, string mainNetRpcUrl, bool continueOnError, ILogger logger, CancellationToken cancellationToken)
        {
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

                    var tokenUri = await service.TokenURIQueryAsync(tokenId);

                    if (string.IsNullOrWhiteSpace(tokenUri))
                    {
                        state.Errors.Add($"No tokenURI returned for CrypToadz #{tokenId}");
                        if (!continueOnError)
                            return;
                        continue;
                    }

                    var json = await http.GetStringAsync(tokenUri, cancellationToken);

                    var metadata = JsonSerializer.Deserialize<JsonTokenMetadata?>(json);
                    if (metadata == null)
                    {
                        state.Errors.Add($"Failed to parse metadata for CrypToadz #{tokenId}");
                        if (!continueOnError)
                            return;
                        continue;
                    }

                    if (!string.IsNullOrWhiteSpace(metadata.Image))
                    {
                        var buffer = await http.GetByteArrayAsync(metadata.Image, cancellationToken);

                        var isGif = LUT.CustomAnimationTokenIds.Contains(tokenId);

                        var sw = Stopwatch.StartNew();

                        Image image = isGif
                            ? Image.Load<Rgba32>(buffer, _gif)
                            : Image.Load<Rgba32>(buffer, _png);

                        var imageUri = isGif
                            ? image.ToBase64String(GifFormat.Instance)
                            : image.ToBase64String(PngFormat.Instance);

                        row.SourceImageUri = imageUri;

                        logger?.LogInformation("Image conversion took {Elapsed}", sw.Elapsed);
                    }
                    else
                    {
                        state.Errors.Add($"Missing metadata image URI for CrypToadz #{tokenId}");

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
                        logger?.LogWarning("OnChange was not registered");
                    }
                }
            }
        }
    }
}
