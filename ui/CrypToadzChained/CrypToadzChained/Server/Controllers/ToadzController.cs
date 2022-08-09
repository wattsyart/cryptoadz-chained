using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CrypToadzChained.Server.Controllers
{
    [ApiController]
    [Route("toadz")]
    public class ToadzController : ControllerBase
    {
        private readonly HttpClient _http;

        private readonly IOptionsSnapshot<Web3Options> _options;
        private readonly ILogger<ToadzController> _logger;

        public ToadzController(HttpClient http, IOptionsSnapshot<Web3Options> options, ILogger<ToadzController> logger)
        {
            _http = http;
            _options = options;
            _logger = logger;
        }

        [HttpGet("tokenURI/{tokenId}")]
        public async Task<string> GetCanonicalTokenUri(uint tokenId)
        {
            return await ToadzService.GetCanonicalTokenURIAsync(tokenId, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("random")]
        public async Task<string> GetRandomTokenURI()
        {
            return await ToadzService.GetRandomTokenURIAsync(_options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("random/{seed}")]
        public async Task<string> GetRandomTokenURIFromSeed(string seed)
        {
            return await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("tall/{tokenId}")]
        public async Task<bool> GetIsTall(uint tokenId)
        {
            return await ToadzService.GetIsTallAsync(tokenId, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpPost("build")]
        public async Task<string> BuildTokenURI([FromBody] Toad toad)
        {
            return await ToadzService.BuildTokenURIAsync(toad, _options.Value.RpcUrl, _options.Value.ContractAddress, _logger);
        }

        [HttpPost("compare")]
        public async Task<ParityStateRow> CompareImagesAsync([FromBody] ParityStateRow row, CancellationToken cancellationToken)
        {
            return await ParityService.CompareImagesAsync(row, cancellationToken);
        }

        [HttpGet("image")]
        public async Task<string?> GetImageUriAsync([FromQuery(Name = "url")] string url, CancellationToken cancellationToken)
        {
            if (Uri.TryCreate(url, UriKind.Absolute, out var externalImageUrl))
                return await ParityService.GetExternalImageUriAsync(true, _http, externalImageUrl, _logger, cancellationToken);

            _logger.LogError("Invalid URL {Url} passed to image download", url);
            return null;
        }
    }
}