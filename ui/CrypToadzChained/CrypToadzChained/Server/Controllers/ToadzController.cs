using System.Numerics;
using CrypToadzChained.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Contracts.Standards.ERC721.ContractDefinition;
using Nethereum.Web3;

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
            var web3 = new Web3(_options.Value.Url);
            var contract = web3.Eth.ERC721.GetContractService(_options.Value.ContractAddress);

            try
            {
                var function = new TokenURIWithPresentationFunction { TokenId = tokenId, Presentation = 2 };
                var tokenUri = await contract.ContractHandler.QueryAsync<TokenURIWithPresentationFunction, string>(function);
                return tokenUri;
            }
            catch (Exception ex)
            {
                switch (ex.Message)
                {
                    case "out of gas: eth_call":
                    {
                        var function = new TokenURIFunction { TokenId = tokenId };
                        var tokenUri = await contract.ContractHandler.QueryAsync<TokenURIFunction, string>(function);
                        return tokenUri;
                    }
                    default:
                    {
                        _logger.LogError(ex, ex.Message);
                        throw;
                    }
                }
            }
        }

        [HttpGet("random")]
        public async Task<string> GetRandomTokenURI()
        {
            var web3 = new Web3(_options.Value.Url);
            var contract = web3.Eth.ERC721.GetContractService(_options.Value.ContractAddress);
            var function = new RandomTokenURIFromSeed {Seed = (ulong) new Random().NextInt64()};
            var tokenUri = await contract.ContractHandler.QueryAsync<RandomTokenURIFromSeed, string>(function);
            return tokenUri;
        }

        [HttpGet("random/{seed}")]
        public async Task<string> GetRandomTokenURIFromSeed(string seed)
        {
            if (!ulong.TryParse(seed, out var realSeed))
            {
                realSeed = (ulong) new Random().NextInt64();
            }
            var web3 = new Web3(_options.Value.Url);
            var contract = web3.Eth.ERC721.GetContractService(_options.Value.ContractAddress);
            var function = new RandomTokenURIFromSeed { Seed = realSeed };
            var tokenUri = await contract.ContractHandler.QueryAsync<RandomTokenURIFromSeed, string>(function);
            return tokenUri;
        }

        #region Functions

        [Function("tokenURIWithPresentation", "string")]
        public sealed class TokenURIWithPresentationFunction : FunctionMessage
        {
            [Parameter("uint256", "tokenId", 1)]
            public BigInteger TokenId { get; set; }

            [Parameter("uint8", "presentation", 2)]
            public BigInteger Presentation { get; set; }
        }

        [Function("randomTokenURIFromSeed", "string")]
        public sealed class RandomTokenURIFromSeed : FunctionMessage
        {
            [Parameter("uint64", "seed", 1)]
            public BigInteger Seed { get; set; }
        }

        #endregion
    }
}