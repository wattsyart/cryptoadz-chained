using CrypToadzChained.Server.Models;
using CrypToadzChained.Shared;
using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
public class ToadCommandHandler : IDiscordInteractionCommandHandler
{
    private const string ServerUrl = "https://cryptoadzonchain.com";

    private static readonly List<uint> TokenIds;
    private static readonly Random Random;
    private static readonly LruCache<int, GameSession> Sessions;

    static ToadCommandHandler()
    {
        Random = new Random();
        TokenIds = ParityScope.Generated.TokenIds().ToList();
        Sessions = new LruCache<int, GameSession>(10_000);
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
                option.Description = "play among lilies";
                option.Type = DiscordApplicationCommandOptionType.SubCommand;

                option.AddNestedOption(n =>
                {
                    n.Name = "gameID";
                    n.Type = DiscordApplicationCommandOptionType.Integer;
                    n.Description = "the game ID";
                    n.IsRequired = false;
                });

                option.AddNestedOption(n =>
                {
                    n.Name = "guess";
                    n.Type = DiscordApplicationCommandOptionType.Integer;
                    n.Description = "your guess";
                    n.IsRequired = false;
                });
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
                PlayGame(message, command);
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
                        embed.WithURL($"{ServerUrl}/{tokenId}");
                        embed.WithImage($"{ServerUrl}/canonical/img/{tokenId}", width: 1440, height: 1440);
                    });
                }
                else
                {
                    var seed = (ulong)Random.NextInt64();

                    if (message is { Data.Options: { } } && message.Data.TryGetStringOption("seed", out var seedString) && !string.IsNullOrWhiteSpace(seedString) && long.TryParse(seedString, out var seedLong))
                        seed = (ulong)seedLong;

                    command.AddEmbed(embed =>
                    {
                        embed.WithTitle($"CrypToadz #{seed}");
                        embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                        embed.WithURL($"{ServerUrl}/random/{seed}");
                        embed.WithImage($"{ServerUrl}/random/img/{seed}", width: 1440, height: 1440);
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

    private static void PlayGame(DiscordInteraction message, DiscordInteractionResponseBuilder command)
    {
        // See: https://stackoverflow.com/a/72613602

        int id;
        if (message is { Data.Options: { } } && message.Data.TryGetStringOption("gameID", out var idString) && !string.IsNullOrWhiteSpace(idString) && int.TryParse(idString, out var idNumber))
            id = idNumber;
        else 
            id = Random.Next();

        var session = Sessions.Get(id);
        if (session == null)
        {
            session = new GameSession { Id = id };
            Sessions.Add(id, session);
        }

        var random = new Random(id);

        var options = new List<ulong>
        {
            (ulong)random.NextInt64(),
            (ulong)random.NextInt64(),
            (ulong)random.NextInt64(),
            TokenIds[random.Next(TokenIds.Count)]
        };

        var realTokenId = options[4];

        Shuffle(random, options);

        for (var i = 0; i < options.Count; i++)
        {
            var option = options[i];
            if (option == realTokenId)
            {
                session.Index = i;
            }
        }

        if (string.IsNullOrWhiteSpace(session.Winner))
        {
            if (message is { Data.Options: { } } && message.Data.TryGetStringOption("guess", out var guessString) && !string.IsNullOrWhiteSpace(guessString) && int.TryParse(guessString, out var guess))
            {
                if (guess == session.Index)
                {
                    session.Winner = message.User?.Username ?? "Unknown User";
                }
                else
                {
                    command.WithText("You have guessed... poorly.");
                    command.WithEphemeral();
                    return;
                }
            }
        }

        if (!string.IsNullOrWhiteSpace(session.Winner))
        {
            command.AddEmbed(embed =>
            {
                embed.WithTitle($"Among Lilies #{id}");
                embed.WithDescription($"{session.Winner} won this game!");
                embed.WithURL(ServerUrl);
                embed.WithImage($"{ServerUrl}/game/img/{realTokenId}/{session.Index}", width: 1440, height: 1440);
            });

            return;
        }
        
        for (var i = 0; i < options.Count; i++)
        {
            var index = options[i];
            var number = i;

            if (i == 0)
            {
                command.AddEmbed(embed =>
                {
                    embed.WithTitle($"Among Lilies #{id}");
                    embed.WithDescription("Which is the real toad, and not an imposter?");
                    embed.WithURL(ServerUrl);
                    embed.WithImage($"{ServerUrl}/game/img/{index}/{number}", width: 1440, height: 1440);
                });
            }
            else
            {
                command.AddEmbed(embed =>
                {
                    embed.WithURL(ServerUrl);
                    embed.WithImage($"{ServerUrl}/game/img/{index}/{number}", width: 1440, height: 1440);
                });
            }
        }
    }

    private bool IsGameRequest(DiscordInteraction interaction)
    {
        return FindOptionByName(interaction, "game") != null;
    }

    public static void Shuffle<T>(Random random, List<T> list)
    {
        var n = list.Count;
        while (n > 1)
        {
            n--;
            var k = random.Next(n + 1);
            (list[k], list[n]) = (list[n], list[k]);
        }
    }

    public DiscordInteractionDataOption? FindOptionByName(DiscordInteraction interaction, string nameToFind)
    {
        return interaction?.Data?.Options == null ? null : FindOptionInOptions(interaction.Data.Options, nameToFind);
    }

    public DiscordInteractionDataOption? FindOptionInOptions(IEnumerable<DiscordInteractionDataOption>? options, string nameToFind)
    {
        if (options == null)
            return null;

        foreach (var option in options)
        {
            if (option.Name == nameToFind)
                return option;

            var foundNestedOption = FindOptionInOptions(option.Options, nameToFind);
            if (foundNestedOption != null)
                return foundNestedOption;
        }

        return null;
    }


}