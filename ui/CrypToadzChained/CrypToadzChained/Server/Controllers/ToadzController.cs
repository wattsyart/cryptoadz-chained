using CrypToadzChained.Server.Models;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CrypToadzChained.Server.Controllers
{
    [ApiController]
    [Route("toadz")]
    public class ToadzController : ControllerBase
    {
        private readonly ToadzService _service;
        private readonly IOptionsSnapshot<Web3Options> _options;
        private readonly ILogger<ToadzController> _logger;

        public ToadzController(ToadzService service, IOptionsSnapshot<Web3Options> options, ILogger<ToadzController> logger)
        {
            _service = service;
            _options = options;
            _logger = logger;
        }

        [HttpGet("tokenURI/{tokenId}")]
        public async Task<string> GetCanonicalTokenUri(uint tokenId)
        {
            return await _service.GetCanonicalTokenURIAsync(tokenId, _options.Value.Url, _options.Value.ContractAddress, _logger);
        }

        [HttpGet("random")]
        public async Task<string> GetRandomTokenURI()
        {
            return await _service.GetRandomTokenURIAsync(_options.Value.Url, _options.Value.ContractAddress);
        }

        [HttpGet("random/{seed}")]
        public async Task<string> GetRandomTokenURIFromSeed(string seed)
        {
            return await _service.GetRandomTokenURIFromSeedAsync(seed, _options.Value.Url, _options.Value.ContractAddress);
        }

        [HttpPost("build")]
        public async Task<string> BuildTokenURI([FromBody] Toad toad)
        {
            return await _service.BuildTokenURIAsync(toad, _options.Value.Url, _options.Value.ContractAddress);
        }
    }
}