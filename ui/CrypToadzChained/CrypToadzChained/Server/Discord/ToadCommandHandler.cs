using System.Text;
using CrypToadzChained.Server.Models;
using CrypToadzChained.Shared;
using Discord.Interactions.AspNetCore;
using Discord.Interactions.AspNetCore.CommandsHandling;
using Discord.Interactions.Entities.Builders;
using Discord.Interactions.Entities.Commands;
using Discord.Interactions.Entities.Interaction;
using Discord.Interactions.Entities.InteractionResponse;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
public class ToadCommandHandler : IDiscordInteractionCommandHandler
{
    public const int CommandVersion = 1;

    private static readonly List<uint> TokenIds;
    private static readonly Random Random;
    private static readonly LruCache<int, GameSession> Sessions;
    private static int? LastSession;

    static ToadCommandHandler()
    {
        Random = new Random();
        TokenIds = ParityScope.Generated.TokenIds().ToList();
        Sessions = new LruCache<int, GameSession>(10_000);
    }

    // ReSharper disable once UnusedMember.Global
    [InteractionCommandBuilder]
    public static DiscordApplicationCommand Build(IServiceProvider serviceProvider)
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
                    n.Name = "id";
                    n.Type = DiscordApplicationCommandOptionType.Integer;
                    n.Description = "the game id";
                    n.IsRequired = false;
                });

                option.AddNestedOption(n =>
                {
                    n.Name = "guess";
                    n.Type = DiscordApplicationCommandOptionType.Integer;
                    n.Description = "your guess: choose 1, 2, 3, or 4";
                    n.IsRequired = false;
                });
            })
            .AddOption(option =>
            {
                option.Name = "imagine";
                option.Description = "generate new toads with AI";
                option.Type = DiscordApplicationCommandOptionType.SubCommand;

                option.AddNestedOption(n =>
                {
                    n.Name = "prompt";
                    n.Type = DiscordApplicationCommandOptionType.String;
                    n.Description = "imagine a toad that...";
                    n.IsRequired = true;
                });
            })
            .Build();
    }

    public async Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, IServiceProvider serviceProvider, HttpRequest request, CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder();
        var logger = serviceProvider.GetRequiredService<ILogger<ToadCommandHandler>>();
        var options = serviceProvider.GetRequiredService<IOptionsSnapshot<DiscordInteractionsOptions>>();

        var serverUrl = options.Value.ServerUrl;

        try
        {
            if (IsGameRequest(message))
            {
                PlayGame(message, command, options.Value, logger);
            }
            else if (IsImagineRequest(message))
            {
                logger.LogInformation("Starting imagine request");

                if (message is { Data.Options: { } } && message.Data.TryGetStringOption("prompt", out var prompt))
                {
                    try
                    {
                        var user = (message.Message?.Author ?? message.GetUser())?.Username ?? "Unknown User";
                        logger.LogInformation("User '{User}' imagined prompt {Prompt}", user, prompt);

                        var http = serviceProvider.GetRequiredService<HttpClient>();
                        var imagineRequest = new ImagineRequest { Prompt = prompt };
                        var response = await http.PostAsJsonAsync($"{serverUrl}/imagine", imagineRequest, cancellationToken);
                        if (response.IsSuccessStatusCode)
                        {
                            var tokenUri = await response.Content.ReadAsStringAsync(cancellationToken);
                            var data = tokenUri.Replace(DataUri.Json, "");
                            var buffer = Convert.FromBase64String(data);
                            var json = Encoding.UTF8.GetString(buffer);
                            var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(json);
                            var seed = metadata?.Name?.Replace("CrypToadz #", "");

                            command.AddEmbed(embed =>
                            {
                                embed.WithTitle("An Imagined Toad");
                                embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                                embed.WithURL($"{serverUrl}/builder/?seed={seed}");
                                embed.WithImage($"{serverUrl}/builder/img/?seed={seed}", width: 1440, height: 1440);
                            });
                        }
                        else
                        {
                            command.WithText($"Bot error: {await response.Content.ReadAsStringAsync(cancellationToken)}");
                            command.WithEphemeral();
                        }
                    }
                    catch (Exception e)
                    {
                        command.WithText($"Bot error: {e.Message} {e.StackTrace}");
                        command.WithEphemeral();
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
                        embed.WithURL($"{serverUrl}/{tokenId}");
                        embed.WithImage($"{serverUrl}/canonical/img/{tokenId}", width: 1440, height: 1440);
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
                        embed.WithURL($"{serverUrl}/random/{seed}");
                        embed.WithImage($"{serverUrl}/random/img/{seed}", width: 1440, height: 1440);
                    });
                }
            }
        }
        catch (Exception e)
        {
            command.WithText($"Bot error: {e.Message} {e.StackTrace}");
            command.WithEphemeral();
        }

        return command.Build();
    }

    private static void PlayGame(DiscordInteraction message, DiscordInteractionResponseBuilder command, DiscordInteractionsOptions options, ILogger<ToadCommandHandler> logger)
    {
        // See: https://stackoverflow.com/a/72613602

        logger.LogInformation("Starting game request");

        if (message is { Data.Options: { } } && message.Data.TryGetIntegerOption("id", out var id))
        {
            logger.LogInformation("Resuming existing game #{Id}", id);
        }
        else
        {
            if (LastSession.HasValue)
            {
                id = LastSession.Value;
                logger.LogInformation("Resuming last game #{Id}", id);
            }
            else
            {
                id = Random.Next();    
                logger.LogInformation("Starting new game #{Id}", id);
            }
        }

        var session = Sessions.Get(id);
        if (session == null)
        {
            logger.LogInformation("Adding game #{Id} to cache", id);
            session = new GameSession { Id = id };
            Sessions.Add(id, session);
            LastSession = id;
        }

        var random = new Random(id);

        var choices = new List<ulong>
        {
            (ulong)random.NextInt64(),
            (ulong)random.NextInt64(),
            (ulong)random.NextInt64(),
            TokenIds[random.Next(TokenIds.Count)]
        };

        logger.LogInformation("Fake Toad #1: {Seed}", choices[0]);
        logger.LogInformation("Fake Toad #2: {Seed}", choices[1]);
        logger.LogInformation("Fake Toad #3: {Seed}", choices[2]);
        logger.LogInformation("Real Toad #4: {Seed}", choices[3]);
        
        var realTokenId = choices[3];

        logger.LogInformation("Shuffling toads...");
        Shuffle(random, choices);

        for (var i = 0; i < choices.Count; i++)
        {
            var option = choices[i];
            if (option == realTokenId)
            {
                
                logger.LogInformation("Winning toad is #{Index}", i + 1);
                session.Index = i;
            }
        }
        
        var user = (message.Message?.Author ?? message.GetUser())?.Username ?? "Unknown User";

        logger.LogInformation("Message: {Json}", JsonConvert.SerializeObject(message));

        if (string.IsNullOrWhiteSpace(session.Winner))
        {
            if (message is { Data.Options: { } } && message.Data.TryGetStringOption("guess", out var guessString) && !string.IsNullOrWhiteSpace(guessString) && int.TryParse(guessString, out var guess))
            {
                if (guess is < 1 or > 4)
                {
                    command.WithText("You must choose a number between 1 and 4.");
                    command.WithEphemeral();
                    return;
                }

                if (session.Players.Contains(user))
                {
                    command.WithText("You already guessed for this game. :(");
                    command.WithEphemeral();
                    return;
                }

                session.Players.Add(user);

                guess--;

                if (guess == session.Index)
                {
                    session.Winner = user;
                }
                else
                {
                    var imposterTokenId = choices[guess];

                    command.AddEmbed(embed =>
                    {
                        embed.WithTitle($"Among Lilies #{id}");
                        embed.WithDescription($"{user} chose the wrong toad. It was an imposter!");
                        embed.WithURL($"{options.ServerUrl}/random/{imposterTokenId}");
                        embed.WithImage($"{options.ServerUrl}/game/img/{imposterTokenId}/{guess + 1}", width: 1440, height: 1440);
                    });
                    return;
                }
            }
        }

        if (!string.IsNullOrWhiteSpace(session.Winner))
        {
            command.AddEmbed(embed =>
            {
                embed.WithTitle($"Among Lilies #{id}");
                embed.WithDescription($"{session.Winner} won this game! This is Cryptoad #{realTokenId}.");
                embed.WithURL($"{options.ServerUrl}/{realTokenId}");
                embed.WithImage($"{options.ServerUrl}/game/img/{realTokenId}/{session.Index + 1}", width: 1440, height: 1440);
            });

            LastSession = null;
            return;
        }

        var seedList = string.Join(",", choices);
        var imageUrl = $"{options.ServerUrl}/game/imgs/?seeds={seedList}";

        command.AddEmbed(embed =>
        {
            embed.WithTitle($"Among Lilies #{id}");
            embed.WithDescription("Which is the real toad, and not an imposter?");
            embed.WithURL(options.ServerUrl);
            embed.WithImage(imageUrl, width: 2880, height: 2880);
        });
    }

    private bool IsGameRequest(DiscordInteraction interaction)
    {
        return FindOptionByName(interaction, "game") != null;
    }

    private bool IsImagineRequest(DiscordInteraction interaction)
    {
        return FindOptionByName(interaction, "prompt") != null;
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
        return interaction.Data?.Options == null ? null : FindOptionInOptions(interaction.Data.Options, nameToFind);
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