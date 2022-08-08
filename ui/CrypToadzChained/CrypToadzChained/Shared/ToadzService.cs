using System.Numerics;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Nethereum.ABI.FunctionEncoding;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using Nethereum.Contracts.Standards.ERC721.ContractDefinition;
using Nethereum.JsonRpc.Client;
using Nethereum.Web3;

namespace CrypToadzChained.Shared
{
    public static class ToadzService
    {
        public static async Task<bool> GetIsTallAsync(uint tokenId, string url, string contractAddress, ILogger? logger)
        {
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);
            try
            {
                var function = new IsTallFunction { TokenId = tokenId };
                var isTall = await contract.ContractHandler.QueryAsync<IsTallFunction, bool>(function);
                return isTall;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to fetch tallness by token ID");
                return false;
            }
        }

        public static async Task<string> GetCanonicalTokenURIAsync(uint tokenId, string url, string contractAddress, ILogger? logger)
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
                logger?.LogError(ex, "Failed to fetch canonical token ID {TokenID}", tokenId);

                switch (ex)
                {
                    case SmartContractRevertException revert:
                        return revert.RevertMessage;
                    case RpcResponseException rpc:
                        return rpc.RpcError.Message;
                    default:
                        throw;
                }
            }
        }

        public static async Task<string> GetRandomTokenURIAsync(string url, string contractAddress, ILogger? logger)
        {
            try
            {
                var web3 = new Web3(url);
                var contract = web3.Eth.ERC721.GetContractService(contractAddress);
                var function = new RandomTokenURIFromSeedFunction { Seed = (ulong)new Random().NextInt64() };
                var tokenUri = await contract.ContractHandler.QueryAsync<RandomTokenURIFromSeedFunction, string>(function);
                return tokenUri;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to fetch random token");

                switch (ex)
                {
                    case SmartContractRevertException revert:
                        return revert.RevertMessage;
                    case RpcResponseException rpc:
                        return rpc.RpcError.Message;
                    default:
                        throw;
                }
            }
        }

        public static async Task<string> GetRandomTokenURIFromSeedAsync(string seed, string url, string contractAddress, ILogger? logger)
        {
            try
            {
                if (!ulong.TryParse(seed, out var realSeed))
                    realSeed = (ulong)new Random().NextInt64();
                var web3 = new Web3(url);
                var contract = web3.Eth.ERC721.GetContractService(contractAddress);
                var function = new RandomTokenURIFromSeedFunction { Seed = realSeed };
                var tokenUri = await contract.ContractHandler.QueryAsync<RandomTokenURIFromSeedFunction, string>(function);
                return tokenUri;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to fetch random token with Seed {Seed}", seed);

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

        public static async Task<string> BuildTokenURIAsync(Toad toad, string url, string contractAddress, ILogger? logger)
        {
            var meta = toad.ToMetadataBuffer();

            try
            {
                var web3 = new Web3(url);
                var contract = web3.Eth.ERC721.GetContractService(contractAddress);
                var function = new BuildTokenURIFunction { Meta = meta };
                var tokenUri = await contract.ContractHandler.QueryAsync<BuildTokenURIFunction, string>(function);

                if (tokenUri.StartsWith("data:application/json;base64,"))
                {
                    var json = tokenUri.Replace("data:application/json;base64,", "");
                    var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(Encoding.UTF8.GetString(Convert.FromBase64String(json)));
                    if (metadata == null)
                        return tokenUri;

                    var metaString = Convert.ToBase64String(meta);
                    metadata.Name = $"CrypToadz #{metaString}";
                    tokenUri = $"data:application/json;base64,{Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonSerializer.Serialize(metadata)))}";
                }

                return tokenUri;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to fetch builder token with BuilderSeed {BuilderSeed}", Convert.ToBase64String(meta));

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
        
        #region Functions

        [Function("randomTokenURIFromSeed", "string")]
        public sealed class RandomTokenURIFromSeedFunction : FunctionMessage
        {
            [Parameter("uint64", "seed", 1)]
            public BigInteger Seed { get; set; }
        }

        [Function("buildTokenURI", "string")]
        public sealed class BuildTokenURIFunction : FunctionMessage
        {
            [Parameter("uint8[]", "meta", 1)]
            public byte[] Meta { get; set; } = null!;
        }

        [Function("isTall", "string")]
        public sealed class IsTallFunction : FunctionMessage
        {
            [Parameter("uint256", "tokenId", 1)]
            public BigInteger TokenId { get; set; }
        }

        #endregion
    }
}
