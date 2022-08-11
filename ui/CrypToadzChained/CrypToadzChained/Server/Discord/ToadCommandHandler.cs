using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
[InteractionCommand(DiscordApplicationCommandType.ChatInput, "toad", "returns a random, fully on-chain toad")]
public class ToadCommandHandler : IDiscordInteractionCommandHandler
{
    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request, CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder()
            .AddEmbed(embed =>
            {
                var seed = (ulong)new Random().NextInt64();
                embed.WithTitle($"CrypToadz #{seed}");
                embed.WithDescription("A small, warty, amphibious creature that resides in the metaverse.");
                embed.WithURL($"https://cryptoadzchained.com/random/{seed}");
                embed.WithImage($"https://cryptoadzchained.com/random/img/{seed}");
            })
            .Build();

        return Task.FromResult(command);
    }
}