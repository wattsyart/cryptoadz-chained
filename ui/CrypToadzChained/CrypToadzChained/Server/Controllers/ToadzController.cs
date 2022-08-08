using CrypToadzChained.Shared;
using Jering.Javascript.NodeJS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace CrypToadzChained.Server.Controllers
{
    [ApiController]
    [Route("toadz")]
    public class ToadzController : ControllerBase
    {
        private readonly ToadzService _service;
        private readonly IOptionsSnapshot<Web3Options> _options;
        private readonly ILogger<ToadzController> _logger;
        private readonly GifDecoder _gif;
        private readonly PngDecoder _png;

        public ToadzController(ToadzService service, IOptionsSnapshot<Web3Options> options, ILogger<ToadzController> logger)
        {
            _service = service;
            _options = options;
            _logger = logger;

            _gif = new GifDecoder();
            _png = new PngDecoder();
        }

        [HttpGet("tokenURI/{tokenId}")]
        public async Task<string> GetCanonicalTokenUri(uint tokenId)
        {
            return await _service.GetCanonicalTokenURIAsync(tokenId, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("random")]
        public async Task<string> GetRandomTokenURI()
        {
            return await _service.GetRandomTokenURIAsync(_options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("random/{seed}")]
        public async Task<string> GetRandomTokenURIFromSeed(string seed)
        {
            return await _service.GetRandomTokenURIFromSeedAsync(seed, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("tall/{tokenId}")]
        public async Task<bool> GetIsTall(uint tokenId)
        {
            return await _service.GetIsTallAsync(tokenId, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpPost("build")]
        public async Task<string> BuildTokenURI([FromBody] Toad toad)
        {
            return await _service.BuildTokenURIAsync(toad, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpPost("compare")]
        public async Task<ParityStateRow> CompareImagesAsync([FromBody] ParityStateRow row, CancellationToken cancellationToken)
        {
            var sourceImage = row.SourceImageUri;
            var sourceImagePath = Path.GetTempFileName();
            if (sourceImage!.StartsWith(Constants.GifDataUri))
            {
                sourceImage = sourceImage[Constants.GifDataUri.Length..];
                await System.IO.File.WriteAllBytesAsync(sourceImagePath, Convert.FromBase64String(sourceImage), cancellationToken);
            }
            else if (sourceImage.StartsWith(Constants.PngDataUri))
            {
                sourceImage = sourceImage[Constants.PngDataUri.Length..];

                Image image = Image.Load<Rgba32>(Convert.FromBase64String(sourceImage), _png);

                var size = new Size(36, 36);
                image.Mutate(x => x
                    .Resize(
                        new ResizeOptions
                        {
                            Size = size,
                            Sampler = KnownResamplers.NearestNeighbor
                        }));
                
                sourceImage = image.ToBase64String(PngFormat.Instance)[Constants.PngDataUri.Length..];

                await System.IO.File.WriteAllBytesAsync(sourceImagePath, Convert.FromBase64String(sourceImage), cancellationToken);
            }

            var targetImage = row.TargetImageUri;
            var targetImagePath = Path.GetTempFileName();
            if (targetImage!.StartsWith(Constants.GifDataUri))
            {
                // First we need to convert from GIF to PNG for comparison
                targetImage = targetImage[Constants.GifDataUri.Length..];
                Image image = Image.Load<Rgba32>(Convert.FromBase64String(targetImage), _gif);
                targetImage = image.ToBase64String(PngFormat.Instance)[Constants.PngDataUri.Length..];

                await System.IO.File.WriteAllBytesAsync(targetImagePath, Convert.FromBase64String(targetImage), cancellationToken);
            }
            else if (targetImage.StartsWith(Constants.PngDataUri))
            {
                targetImage = targetImage[Constants.PngDataUri.Length..];
                await System.IO.File.WriteAllBytesAsync(targetImagePath, Convert.FromBase64String(targetImage), cancellationToken);
            }

            var deltaImagePath = Path.GetTempFileName();

            const string diffModule = @"
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

            var badPixels = await StaticNodeJSService.InvokeFromStringAsync<int>(diffModule, args: new object[]
            {
                // sourceImagePath
                sourceImagePath,

                // targetImagePath
                targetImagePath,

                // deltaImagePath
                deltaImagePath
            }, cancellationToken: cancellationToken);


            row.BadPixels = badPixels;
            row.DeltaImageUri = Image.Load<Rgba32>(await System.IO.File.ReadAllBytesAsync(deltaImagePath, cancellationToken), _png).ToBase64String(PngFormat.Instance);

            return row;
        }
    }
}