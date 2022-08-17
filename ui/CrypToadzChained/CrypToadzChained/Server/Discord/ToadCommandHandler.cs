﻿using System.Text.Json;
using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
public class ToadCommandHandler : IDiscordInteractionCommandHandler
{
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
            .Build();
    }

    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request,
        CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder();

        try
        {
            //command.WithText(JsonSerializer.Serialize(message));
            //command.WithEphemeral();
            //return Task.FromResult(command.Build());

            ulong? tokenId = null;
            if (message is { Data.Options: { } } && message.Data.TryGetIntegerOption("id", out var tokenInt))
                tokenId = (ulong)tokenInt;

            if (tokenId.HasValue)
            {
                command.AddEmbed(embed =>
                {
                    embed.WithTitle($"CrypToadz #{tokenId}");
                    embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                    embed.WithURL($"https://cryptoadzchained.com/{tokenId}");
                    embed.WithImage($"https://cryptoadzchained.com/canonical/img/{tokenId}");
                });
            }
            else
            {
                var seed = (ulong)new Random().NextInt64();

                if (message is { Data.Options: { } } && message.Data.TryGetStringOption("seed", out var seedString) &&
                    !string.IsNullOrWhiteSpace(seedString) && long.TryParse(seedString, out var seedLong))
                    seed = (ulong)seedLong;

                command.AddEmbed(embed =>
                {
                    embed.WithTitle($"CrypToadz #{seed}");
                    embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                    embed.WithURL($"https://cryptoadzchained.com/random/{seed}");
                    embed.WithImage($"https://cryptoadzchained.com/random/img/{seed}");
                });
            }
        }
        catch (Exception e)
        {
            command.WithText($"Bot error: {e.Message}");
            command.WithEphemeral();
        }

        return Task.FromResult(command.Build());
    }
}