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
        return DiscordApplicationCommandBuilder.CreateSlashCommand("toad", "returns a random, fully on-chain toad")
            .AddOption(option =>
            {
                option.Name = "seed";
                option.Description = "share a specific random toad";
                option.Type = DiscordApplicationCommandOptionType.Integer;
                option.IsRequired = false;
            })
            .Build();
    }

    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request, CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder();

        try
        {
            var seed = (ulong)new Random().NextInt64();
        
            if(message is { Data: { } } && message.Data.TryGetIntegerOption("seed", out var seedInt))
                seed = (ulong) seedInt;

            command.AddEmbed(embed =>
            {
                embed.WithTitle($"CrypToadz #{seed}");
                embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                embed.WithURL($"https://cryptoadzchained.com/random/{seed}");
                embed.WithImage($"https://cryptoadzchained.com/random/img/{seed}");
            });
        }
        catch (Exception e)
        {
            command.WithText(e.ToString());
            command.WithEphemeral();
        }
        return Task.FromResult(command.Build());
    }

}