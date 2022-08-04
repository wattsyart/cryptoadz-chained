using System.Numerics;
using Microsoft.Extensions.Logging;
using Nethereum.ABI.FunctionEncoding;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Contracts.Standards.ERC721.ContractDefinition;
using Nethereum.Web3;

namespace CrypToadzChained.Shared
{
    public sealed class ToadzService
    {
        public async Task<string> GetCanonicalTokenURI(uint tokenId, string url, string contractAddress, ILogger logger)
        {
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);

            try
            {
                var function = new TokenURIWithPresentationFunction { TokenId = tokenId, Presentation = 2 };
                var tokenUri = await contract.ContractHandler.QueryAsync<TokenURIWithPresentationFunction, string>(function);
                return tokenUri;
            }
            catch (Exception ex)
            {
                if (ex is SmartContractRevertException revert)
                {
                    return revert.RevertMessage;
                }

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
                        logger.LogError(ex, "Failed to fetch canonical token ID");
                        throw;
                    }
                }
            }
        }

        public async Task<string> GetRandomTokenURI(string url, string contractAddress)
        {
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);
            var function = new RandomTokenURIFromSeed { Seed = (ulong)new Random().NextInt64() };
            var tokenUri = await contract.ContractHandler.QueryAsync<RandomTokenURIFromSeed, string>(function);
            return tokenUri;
        }

        public async Task<string> GetRandomTokenURIFromSeed(string seed, string url, string contractAddress)
        {
            if (!ulong.TryParse(seed, out var realSeed))
                realSeed = (ulong)new Random().NextInt64();
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);
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
