using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Represents an instance of a class that can be invoked by a Discord Interaction.</summary>
    public interface IDiscordInteractionCommandHandler
    {
        /// <summary>Invokes the command's code.</summary>
        /// <param name="message">Received interaction.</param>
        /// <param name="request">HTTP Request of the interaction.</param>
        /// <param name="cancellationToken">Cancellation token used to cancel operations.</param>
        /// <returns>Response to the interaction.</returns>
        Task<DiscordInteractionResponse> InvokeAsync(DiscordInteraction message, HttpRequest request, CancellationToken cancellationToken);
    }
}
