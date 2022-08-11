using TehGM.Discord;
using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
public class RandomImageCommandHandler : IDiscordInteractionCommandHandler
{
    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request, CancellationToken cancellationToken)
    {
        var response = new DiscordInteractionResponseBuilder();

        try
        {
            long? seed = null;
            if (message.Data.TryGetStringOption("seed", out var seedString))
            {
                if(long.TryParse(seedString, out var value))
                    seed = value;
            }
            
            response.AddEmbed(embed =>
            {
                embed.WithType(DiscordEmbedType.Image);
                embed.WithImage(seed.HasValue
                    ? $"https://cryptoadzchained.com/random/img/{(ulong)seed}"
                    : $"https://cryptoadzchained.com/random/img");
            });
        }
        catch (Exception e)
        {
            response.WithText($"Oops, something went wrong! ({e.Message})");
            response.WithEphemeral();
        }

        return Task.FromResult(response.Build());
    }

    // ReSharper disable once UnusedMember.Local (Reflection)
    [InteractionCommandBuilder]
    private static DiscordApplicationCommand Build()
    {
        return DiscordApplicationCommandBuilder.CreateSlashCommand("random", "Returns a random, fully on-chain CrypToadz")
            .AddOption(option =>
            {
                option.Name = "seed";
                option.Description = "recreate the toad from a specific seed";
                option.Type = DiscordApplicationCommandOptionType.String;
                option.IsRequired = false;
            })
            .Build();
    }
}