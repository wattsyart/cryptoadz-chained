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
using OpenAI;
using OpenAI.V1.Chat;

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
                    case SmartContractCustomErrorRevertException customRevert:
                        return customRevert.Message;
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

                if (ex is SmartContractCustomErrorRevertException customRevert)
                {
                    return customRevert.Message;
                }

                if (ex is RpcResponseException rpc)
                {
                    return rpc.RpcError.Message;
                }

                throw;
            }
        }

        public static async Task<string> ImagineTokenURIAsync(HttpClient http, string apiKey, string prompt, string url, string contractAddress,
            ILogger? logger)
        {
            var client = new OpenAiClient(http, apiKey, logger);
            var messages = new List<ChatMessage>
            {
                new()
                {
                    Role = ChatRole.Assistant,
                    Content = ChatGptPrompt
                },
                new()
                {
                    Role = ChatRole.User,
                    Content = prompt
                }
            };
            
            var response = await client.V1.Chat.CreateAsync(messages, 6000);

            var last = response.Choices?.LastOrDefault();
            var lines = last?.Message?.Content?.Split("\n", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            if(lines == null || lines.Length < 3)
                return "Error";

            var toad = new Toad();
            var numberOfTraits = 0;
            foreach (var line in lines)
            {
                var tokens = line.Split(":", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (tokens.Length != 2)
                    continue;

                var trait = tokens[1];
                switch (tokens[0])
                {
                    case "Size":
                    {
                        if (Enum.TryParse<Size>(trait, true, out var value))
                        {
                            toad.Size = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Background":
                    {
                        if (Enum.TryParse<Background>(trait, true, out var value))
                        {
                            toad.Background = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Body":
                    {
                        if (Enum.TryParse<Body>(trait, true, out var value))
                        {
                            toad.Body = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Mouth":
                    {
                        if (Enum.TryParse<Mouth>(trait, true, out var value))
                        {
                            toad.Mouth = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Head":
                    {
                        if (Enum.TryParse<Head>(trait, true, out var value))
                        {
                            toad.Head = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Eyes":
                    {
                        if (Enum.TryParse<Eyes>(trait, true, out var value))
                        {
                            toad.Eyes = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Clothes":
                    {
                        if (Enum.TryParse<Clothes>(trait, true, out var value))
                        {
                            toad.Clothes = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Accessory II":
                    {
                        if (Enum.TryParse<AccessoryIi>(trait, true, out var value))
                        {
                            toad.AccessoryIi = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                    case "Accessory I":
                    {
                        if (Enum.TryParse<AccessoryI>(trait, true, out var value))
                        {
                            toad.AccessoryI = value;
                            numberOfTraits++;
                        }
                        break;
                    }
                }
            }

            toad.NumberOfTraits = numberOfTraits switch
            {
                1 => NumberOfTraits._1,
                2 => NumberOfTraits._2,
                3 => NumberOfTraits._3,
                4 => NumberOfTraits._4,
                5 => NumberOfTraits._5,
                6 => NumberOfTraits._6,
                7 => NumberOfTraits._7,
                _ => NumberOfTraits._1
            };
            
            return await BuildTokenURIAsync(toad, url, contractAddress, logger);
        }

        public static async Task<string> BuildTokenURIAsync(Toad toad, string url, string contractAddress, ILogger? logger) => await BuildTokenURIFromBufferAsync(toad.ToMetadataBuffer(), url, contractAddress, logger);

        public static async Task<string> BuildTokenURIFromBufferAsync(byte[] meta, string url, string contractAddress, ILogger? logger)
        {
            try
            {
                var web3 = new Web3(url);
                var contract = web3.Eth.ERC721.GetContractService(contractAddress);
                var function = new BuildTokenURIFunction { Meta = meta };
                var tokenUri = await contract.ContractHandler.QueryAsync<BuildTokenURIFunction, string>(function);

                if (tokenUri.StartsWith("data:application/json;base64,"))
                {
                    var json = tokenUri.Replace("data:application/json;base64,", "");
                    var metadata =
                        JsonSerializer.Deserialize<JsonTokenMetadata>(Encoding.UTF8.GetString(Convert.FromBase64String(json)));
                    if (metadata == null)
                        return tokenUri;

                    var metaString = Convert.ToBase64String(meta);
                    metadata.Name = $"CrypToadz #{metaString}";
                    tokenUri =
                        $"data:application/json;base64,{Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonSerializer.Serialize(metadata)))}";
                }

                return tokenUri;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to fetch builder token with BuilderSeed {BuilderSeed}",
                    Convert.ToBase64String(meta));

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

        public static async Task<string> GetTokenURIWithPresentationAsync(uint tokenId, byte presentation, string url, string contractAddress, ILogger? logger)
        {
            var web3 = new Web3(url);
            var contract = web3.Eth.ERC721.GetContractService(contractAddress);

            try
            {
                var function = new TokenURIWithPresentationFunction { TokenId = tokenId, Presentation = presentation };
                var tokenUri = await contract.ContractHandler.QueryAsync<TokenURIWithPresentationFunction, string>(function);
                return tokenUri;
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Failed to fetch presentational token ID {TokenID}", tokenId);

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

        [Function("isTall", "bool")]
        public sealed class IsTallFunction : FunctionMessage
        {
            [Parameter("uint256", "tokenId", 1)]
            public BigInteger TokenId { get; set; }
        }

        [Function("tokenURIWithPresentation", "string")]
        public sealed class TokenURIWithPresentationFunction : FunctionMessage
        {
            [Parameter("uint256", "tokenId", 1)]
            public BigInteger TokenId { get; set; }

            [Parameter("uint8", "presentation", 2)]
            public byte Presentation { get; set; }
        }

        #endregion

        #region Prompt Design

        private const string ChatGptPrompt = "- You are a bot designed to dream up new toad metadata given a user's prompt that starts with \"imagine\".\n" +
                                             "- You will respond with the trait and it's name exactly as provided\n" +
                                             "- DO NOT provide explanations, just provide the final output\n" +
                                             "- You MUST have a Size, Background and Body, but do not need to provide other traits if they don't make sense\n" +
                                             "- You MUST provide the traits one line at a time and always in the exact order provided here\n\n" +
                                             "- You MUST NEVER provide more than 8 traits in total, including Size\n\n" +
                                             "Size:\n=====\nShort\nTall\n\n" +
                                             "Background:\n===========\n_95\nViolet\nGreyteal\nGreige\nDamp\nGreyFoam\nBubblegum\nUniverseFoam\nDark\nMold\nBlanket\nBruise\nMiddlegrey\nSalmon\nBlood\nGhostCrash\nMatrix\n\n" +
                                             "Body:\n=====\nAlbino\nPasty\nSleepy\nCreep\nHypnotic\nGorilla\nBooger\nNormal\nOnlySocks\nGummySlime\nGummyBlue\nGremplinGreen\nGummyRaspberry\nAngry\nChimp\nAlien\nGummyPeach\nBlueCat\nGummyTropical\nGargoyle\nUndead\nGremplinBlue\nToadbot\nBerry\nApe\nLasagna\nDog\nBloodBones\nPox\nBones\nGhost\nToadenza\nGhostBones\nBigGhost\n\n" +
                                             "Mouth:\n======\nBeard\nPinkBucktooth\nLincoln\nSad\nTealSmile\nBanditSmile\nShifty\nPurpleWide\nPeachSmile\nSlimy\nBlueSmile\nTealWide\nRibbitBlue\nBanditWide\nGreenBucktooth\nCroak\nWellActually\nVampire\n  \n" +
                                             "Head:\n=====\nFunCap\nSwampyCrazy\nWildBlack\nFez\nPlaidCap\nTealKnitHat\nBluePigtails\nBlondePigtails\nBackwardCap\nSwampySingleBun\nSwampyFlattop\nRustyCap\nSweptPurple\nWizard\nOrangeTallHat\nSwampyDoubleBun\nSwampySidepart\nSweptOrange\nSuperStringy\nRedGnome\nOrangeKnitHat\nAquaMohawk\nBlackSidepart\nStringy\nOrangeDoubleBuns\nPinkPuff\nAquaShave\nRainbowMohawk\nFloppyHat\nBlueShave\nOrangeBumps\nDarkPigtails\nGreyKnitHat\nBrain\nPeriwinkleCap\nAquaPuff\nTealGnome\nWildWhite\nDarkSingleBun\nBowlcut\nShortFeatheredHat\nAquaSidepart\nTophat\nSwampyBumps\nOrangeShave\nWildOrange\nCrazyBlonde\nYellowFlattop\nToadstool\nDarkTallHat\nSweptTeal\nTruffle\nVampire\n  \n" +
                                             "Eyes:\n=====\nBigYellowSideeye\nButthole\nNounishBlue\nVioletGoggles\nGremplin\nGoldSpecs\nJudgment\nBigCrazyOrange\nRoundShades\nThickSquare\nAwake\nCoolShades\nBlackBlueGoggles\nAnime\nRedBlackGoggles\nDilated\nWhiteRedGoggles\nGlowingRed\nBlueEyeshadow\nPatch\nNiceShades\nThickRound\nCroaked\nNounishRed\nBandit\n_3D\nBigCrazyRed\nGreenEyeshadow\nGlowingBlue\nNerd\nVampire\nUndead\nCreep\n\n" +
                                             "Clothes:\n========\nGreyHoodie\nSlimeHoodie\nForceHoodie\n\n" +
                                             "Accessory II: \n=============\nLongCigarette\nShortCigarette\nBlush\nChocolate\nEarring\nShackles\nWatch\nJustForTheLooks\n\n" +
                                             "Accessory I:\n============\nThreeFlies\nExplorer\nToxicLumps\nTwoFlies\nDrivethru\nFlyLick\nOneFly\nFourFlies\nMysteriousHoodie\n  \nPROMPT: \nImagine a toad that would fit in on the beach\nOUTPUT: \nSize: Tall\nBackground: Bubblegum\nBody: GummyTropical\nEyes: CoolShade\nAccessory II: Blush\n\nPROMPT:";

        #endregion
    }
}
