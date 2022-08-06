using System.Numerics;
using Microsoft.Extensions.Logging;
using Nethereum.ABI.FunctionEncoding;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Contracts.Standards.ERC721.ContractDefinition;
using Nethereum.JsonRpc.Client;
using Nethereum.Web3;

namespace CrypToadzChained.Shared
{
    public sealed class ToadzService
    {
        public async Task<string> GetCanonicalTokenURIAsync(uint tokenId, string url, string contractAddress, ILogger logger)
        {
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);

            try
            {
                var function = new TokenURIFunction { TokenId = tokenId };
                var tokenUri = await contract.ContractHandler.QueryAsync<TokenURIFunction, string>(function);
                return tokenUri;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to fetch canonical token ID");

                if (ex is SmartContractRevertException revert)
                {
                    return revert.RevertMessage;
                }

                if (ex is RpcResponseException rpc)
                {
                    return rpc.RpcError.Message;
                }

                throw;
            }
        }

        public async Task<string> GetRandomTokenURIAsync(string url, string contractAddress)
        {
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);
            var function = new RandomTokenURIFromSeed { Seed = (ulong)new Random().NextInt64() };
            var tokenUri = await contract.ContractHandler.QueryAsync<RandomTokenURIFromSeed, string>(function);
            return tokenUri;
        }

        public async Task<string> GetRandomTokenURIFromSeedAsync(string seed, string url, string contractAddress)
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

        [Function("randomTokenURIFromSeed", "string")]
        public sealed class RandomTokenURIFromSeed : FunctionMessage
        {
            [Parameter("uint64", "seed", 1)]
            public BigInteger Seed { get; set; }
        }

        #endregion
    }
}
