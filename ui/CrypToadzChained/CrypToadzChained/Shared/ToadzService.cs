using System.Numerics;
using System.Text;
using System.Text.Json;
using CrypToadzChained.Shared.Traits;
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

        public async Task<string> BuildTokenURIAsync(Toad toad, string url, string contractAddress)
        {
            var meta = ConvertToadToMeta(toad);

            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);
            var function = new BuildTokenURI { Meta = meta };
            var tokenUri = await contract.ContractHandler.QueryAsync<BuildTokenURI, string>(function);

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

        public static Toad ConvertMetadataToToad(JsonTokenMetadata metadata)
        {
            var toad = new Toad();

            TrySetEnumValueMatch<Size>(toad, metadata);
            TrySetEnumValueMatch<Background>(toad, metadata);
            TrySetEnumValueMatch<Body>(toad, metadata);
            TrySetEnumValueMatch<Mouth>(toad, metadata);
            TrySetEnumValueMatch<Head>(toad, metadata);
            TrySetEnumValueMatch<Eyes>(toad, metadata);
            TrySetEnumValueMatch<Clothes>(toad, metadata);
            TrySetEnumValueMatch<AccessoryIi>(toad, metadata);
            TrySetEnumValueMatch<AccessoryI>(toad, metadata);

            return toad;
        }

        private static void TrySetEnumValueMatch<T>(Toad toad, JsonTokenMetadata metadata) where T : Enum
        {
            var propertyName = typeof(T).Name;

            var traitType = propertyName switch
            {
                nameof(Toad.AccessoryI) => "Accessory I",
                nameof(Toad.AccessoryIi) => "Accessory II",
                _ => propertyName
            };

            var traitValue = metadata.Attributes.SingleOrDefault(x => x.TraitType == traitType)?.Value?.ToString()
                ?.Replace(" ", "")
                 .Replace("-", "")
                ;

            Console.WriteLine($"{propertyName} = {traitValue}");

            foreach (var value in Enum.GetValues(typeof(T)))
            {
                if (traitValue == Enum.GetName(typeof(T), value))
                {
                    var property = typeof(Toad).GetProperty(propertyName);
                    if (property != null)
                    {
                        property.SetValue(toad, value);
                        Console.WriteLine($"set {property.Name} to {value}");
                    }
                }
            }
        }


        public static byte[] ConvertToadToMeta(Toad toad)
        {
            var buffer = new List<byte>
            {
                (byte) toad.Size,
                (byte) toad.Background
            };

            if (toad.Body != Body.None)
                buffer.Add((byte) toad.Body);

            if (toad.Mouth != Mouth.None)
                buffer.Add((byte) toad.Mouth);

            if (toad.Head != Head.None)
                buffer.Add((byte) toad.Head);

            if (toad.Eyes != Eyes.None)
                buffer.Add((byte) toad.Eyes);

            if (toad.Clothes != Clothes.None)
                buffer.Add((byte) toad.Clothes);

            if (toad.AccessoryIi != AccessoryIi.None)
                buffer.Add((byte) toad.AccessoryIi);

            if (toad.AccessoryI != AccessoryI.None)
                buffer.Add((byte) toad.AccessoryI);

            buffer.Add((byte) toad.NumberOfTraits);

            var meta = buffer.ToArray();
            return meta;
        }

        #region Functions

        [Function("randomTokenURIFromSeed", "string")]
        public sealed class RandomTokenURIFromSeed : FunctionMessage
        {
            [Parameter("uint64", "seed", 1)]
            public BigInteger Seed { get; set; }
        }

        [Function("buildTokenURI", "string")]
        public sealed class BuildTokenURI : FunctionMessage
        {
            [Parameter("uint8[]", "meta", 1)]
            public byte[] Meta { get; set; } = null!;
        }

        #endregion
    }
}
