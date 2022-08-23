using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CrypToadzChained.Server.Controllers
{
    [ApiController]
    [Route("toadz")]
    public class ToadzController : ControllerBase
    {
        private readonly IOptionsSnapshot<Web3Options> _options;
        private readonly ILogger<ToadzController> _logger;

        public ToadzController(IOptionsSnapshot<Web3Options> options, ILogger<ToadzController> logger)
        {
            _options = options;
            _logger = logger;
        }

        [HttpGet("tokenURI/{tokenId}")]
        public async Task<string> GetCanonicalTokenUri(uint tokenId)
        {
            return await ToadzService.GetCanonicalTokenURIAsync(tokenId, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        }

        [HttpGet("random")]
        public async Task<string> GetRandomTokenURI()
        {
            return await ToadzService.GetRandomTokenURIAsync(_options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        }

        [HttpGet("random/{seed}")]
        public async Task<string> GetRandomTokenURIFromSeed(string seed)
        {
            return await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        }

        [HttpGet("tall/{tokenId}")]
        public async Task<bool> GetIsTall(uint tokenId)
        {
            return await ToadzService.GetIsTallAsync(tokenId, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        }

        [HttpPost("build")]
        public async Task<string> BuildTokenURI([FromBody] Toad toad)
        {
            return await ToadzService.BuildTokenURIAsync(toad, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        }

        [HttpPost("compare")]
        public ParityStateRow CompareImages([FromBody] ParityStateRow row, CancellationToken cancellationToken)
        {
            return ParityService.CompareImages(row, cancellationToken);
        }

        [HttpGet("patch/tokenURI/{tokenId}")]
        public async Task<string> GetPatchTokenURI(uint tokenId)
        {
            return await ToadzService.GetTokenURIWithPresentationAsync(tokenId, 1, _options.Value.OnChainRpcUrl, _options.Value.PatchContractAddress, _logger);
        }
    }
}