﻿using TehGM.Discord;
using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord;

// ReSharper disable once UnusedMember.Global (Reflection)
[InteractionCommand(DiscordApplicationCommandType.ChatInput, "image", "returns a random, fully on-chain toad image")]
public class ImageCommandHandler : IDiscordInteractionCommandHandler
{
    public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request, CancellationToken cancellationToken)
    {
        var command = new DiscordInteractionResponseBuilder()
            .AddEmbed(embed =>
            {
                var seed = (ulong)new Random().NextInt64();
                embed.WithType(DiscordEmbedType.Image);
                embed.WithImage($"https://cryptoadzchained.com/random/img/{seed}");
            })
            .Build();

        return Task.FromResult(command);
    }
}