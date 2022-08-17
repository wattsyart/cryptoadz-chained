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
                option.Name = "seed";
                option.Description = "share a specific random toad";
                option.Type = DiscordApplicationCommandOptionType.String;
                option.IsRequired = false;
            })
            .AddOption(option =>
            {
                option.Name = "tokenId";
                option.Description = "token ID of the toad";
                option.Type = DiscordApplicationCommandOptionType.Integer;
                option.IsRequired = false;
            })
            
            .Build();
    }

    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request,
        CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder();

        try
        {
            ulong? tokenId = null;
            if (message is { Data.Options: { } } && message.Data.TryGetIntegerOption("tokenId", out var tokenInt))
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