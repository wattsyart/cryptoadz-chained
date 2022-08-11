using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.CommandsHandling;

namespace CrypToadzChained.Server.Discord
{
    // ReSharper disable once UnusedMember.Global (Reflection)
    [InteractionCommand(DiscordApplicationCommandType.ChatInput, "ping", "ping")]
    public class PingCommandHandler : IDiscordInteractionCommandHandler
    {
        public Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request, CancellationToken cancellationToken)
        {
            var command = new DiscordInteractionResponseBuilder()
                .WithText("pong")
                .Build();

            return Task.FromResult(command);
        }
    }
}
