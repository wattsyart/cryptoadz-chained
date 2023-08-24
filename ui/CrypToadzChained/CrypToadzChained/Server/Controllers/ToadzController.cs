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
        private readonly IOptionsSnapshot<OpenAiOptions> _openAiOptions;
        private readonly IOptionsSnapshot<Web3Options> _web3Options;
        private readonly ILogger<ToadzController> _logger;

        public ToadzController(HttpClient http, IOptionsSnapshot<OpenAiOptions> openAiOptions, IOptionsSnapshot<Web3Options> web3Options, ILogger<ToadzController> logger)
        {
            _http = http;
            _openAiOptions = openAiOptions;
            _web3Options = web3Options;
            _logger = logger;
        }

        [HttpGet("tokenURI/{tokenId}")]
        public async Task<string> GetCanonicalTokenUri(uint tokenId)
        {
            return await ToadzService.GetCanonicalTokenURIAsync(tokenId, _web3Options.Value.OnChainRpcUrl, _web3Options.Value.OnChainContractAddress, _logger);
        }

        [HttpGet("random")]
        public async Task<string> GetRandomTokenURI()
        {
            return await ToadzService.GetRandomTokenURIAsync(_web3Options.Value.OnChainRpcUrl, _web3Options.Value.OnChainContractAddress, _logger);
        }

        [HttpGet("random/{seed}")]
        public async Task<string> GetRandomTokenURIFromSeed(string seed)
        {
            return await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _web3Options.Value.OnChainRpcUrl, _web3Options.Value.OnChainContractAddress, _logger);
        }

        [HttpGet("tall/{tokenId}")]
        public async Task<bool> GetIsTall(uint tokenId)
        {
            return await ToadzService.GetIsTallAsync(tokenId, _web3Options.Value.OnChainRpcUrl, _web3Options.Value.OnChainContractAddress, _logger);
        }

        [HttpPost("build")]
        public async Task<string> BuildTokenURI([FromBody] Toad toad)
        {
            return await ToadzService.BuildTokenURIAsync(toad, _web3Options.Value.OnChainRpcUrl, _web3Options.Value.OnChainContractAddress, _logger);
        }

        [HttpPost("compare")]
        public ParityStateRow CompareImages([FromBody] ParityStateRow row, CancellationToken cancellationToken)
        {
            return ParityService.CompareImages(row, cancellationToken);
        }

        [HttpGet("patch/tokenURI/{tokenId}")]
        public async Task<string> GetPatchTokenURI(uint tokenId)
        {
            return await ToadzService.GetTokenURIWithPresentationAsync(tokenId, 1, _web3Options.Value.PatchRpcUrl, _web3Options.Value.PatchContractAddress, _logger);
        }

        [HttpPost("imagine")]
        public async Task<string> Imagine([FromBody] ImagineRequest prompt)
        {
            return await ToadzService.ImagineTokenURIAsync(_http, _openAiOptions.Value.ApiKey, prompt.Prompt, _web3Options.Value.OnChainRpcUrl, _web3Options.Value.OnChainContractAddress, _logger);
        }
    }
}