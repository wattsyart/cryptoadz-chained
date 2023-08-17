using CrypToadzChained.Shared;
using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
public class ToadCommandHandler : IDiscordInteractionCommandHandler
{
    private static readonly List<uint> TokenIds;
    private static readonly Random Random;

    static ToadCommandHandler()
    {
        TokenIds = ParityScope.Generated.TokenIds().ToList();
        Random = new Random();
    }

    // ReSharper disable once UnusedMember.Global
    [InteractionCommandBuilder]
    public static DiscordApplicationCommand Build()
    {
        return DiscordApplicationCommandBuilder.CreateSlashCommand("toad", "returns an on-chain toad")
            .AddOption(option =>
            {
                option.Name = "random";
                option.Description = "returns a random on-chain toad";
                option.Type = DiscordApplicationCommandOptionType.SubCommand;

                option.AddNestedOption(n =>
                {
                    n.Name = "seed";
                    n.Type = DiscordApplicationCommandOptionType.String;
                    n.Description = "use a specific random toad";
                    n.IsRequired = false;
                });
            })
            .AddOption(option =>
            {
                option.Name = "token";
                option.Description = "returns a canonical on-chain toad";
                option.Type = DiscordApplicationCommandOptionType.SubCommand;

                option.AddNestedOption(n =>
                {
                    n.Name = "id";
                    n.Type = DiscordApplicationCommandOptionType.Integer;
                    n.Description = "the token ID for the desired toad";
                    n.IsRequired = true;
                });
            })
            .AddOption(option =>
            {
                option.Name = "game";
                option.Description = "play the 'among lilies' game";
                option.Type = DiscordApplicationCommandOptionType.SubCommand;
            })
            .Build();
    }

    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request,
        CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder();

        try
        {
            if (IsGameRequest(message))
            {
                // See: https://stackoverflow.com/a/72613602

                var options = new List<ulong>
                {
                    (ulong)Random.NextInt64(),
                    (ulong)Random.NextInt64(),
                    (ulong)Random.NextInt64(),
                    TokenIds[Random.Next(TokenIds.Count)]
                };

                Shuffle(options);
                
                for (var i = 0; i < options.Count; i++)
                {
                    var index = options[i];

                    if (i == 0)
                    {
                        command.AddEmbed(embed =>
                        {
                            embed.WithTitle("Among Lilies");
                            embed.WithDescription("Is this the real toad, or an imposter?");
                            embed.WithURL("https://cryptoadzonchain.com");
                            embed.WithImage($"https://cryptoadzonchain.com/random/img/{index}");
                        });
                    }
                    else
                    {
                        command.AddEmbed(embed =>
                        {
                            embed.WithURL("https://cryptoadzonchain.com");
                            embed.WithImage($"https://cryptoadzonchain.com/random/img/{index}");
                        });
                    }
                }
            }
            else
            {
                uint? tokenId = null;
                if (message is { Data.Options: { } } && message.Data.TryGetIntegerOption("id", out var tokenInt))
                    tokenId = (uint)tokenInt;

                if (tokenId.HasValue)
                {
                    command.AddEmbed(embed =>
                    {
                        embed.WithTitle($"CrypToadz #{tokenId}");
                        embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                        embed.WithURL($"https://cryptoadzonchain.com/{tokenId}");
                        embed.WithImage($"https://cryptoadzonchain.com/canonical/img/{tokenId}");
                    });
                }
                else
                {
                    var seed = (ulong)Random.NextInt64();

                    if (message is { Data.Options: { } } && message.Data.TryGetStringOption("seed", out var seedString) &&
                        !string.IsNullOrWhiteSpace(seedString) && long.TryParse(seedString, out var seedLong))
                        seed = (ulong)seedLong;

                    command.AddEmbed(embed =>
                    {
                        embed.WithTitle($"CrypToadz #{seed}");
                        embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                        embed.WithURL($"https://cryptoadzonchain.com/random/{seed}");
                        embed.WithImage($"https://cryptoadzonchain.com/random/img/{seed}");
                    });
                }
            }
        }
        catch (Exception e)
        {
            command.WithText($"Bot error: {e.Message}");
            command.WithEphemeral();
        }

        return Task.FromResult(command.Build());
    }

    private static bool IsGameRequest(DiscordInteraction message)
    {
        if(message is { Data.Options: { } } && message.Data.TryGetStringOption("game", out  _))
            return true;

        return message.Message != null && !string.IsNullOrWhiteSpace(message.Message.Content) &&
               message.Message.Content.Contains("game");
    }

    public static void Shuffle<T>(List<T> list)
    {
        var n = list.Count;
        while (n > 1)
        {
            n--;
            var k = Random.Next(n + 1);
            (list[k], list[n]) = (list[n], list[k]);
        }
    }
}