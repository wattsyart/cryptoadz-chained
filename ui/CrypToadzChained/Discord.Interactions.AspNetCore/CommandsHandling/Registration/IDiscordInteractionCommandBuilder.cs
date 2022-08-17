using System;
using System.Threading;
using System.Threading.Tasks;

namespace TehGM.Discord.Interactions.CommandsHandling.Registration
{
    /// <summary>Builds <see cref="DiscordApplicationCommand"/> from given type.</summary>
    public interface IDiscordInteractionCommandBuilder
    {
        /// <summary>Builds the command from the given type</summary>
        /// <param name="type">Type to build the command from.</param>
        /// <param name="cancellationToken">Cancellation token that will be passed to the build method.</param>
        /// <returns>Built command.</returns>
        Task<DiscordApplicationCommand> BuildAsync(Type type, CancellationToken cancellationToken);
    }
}
