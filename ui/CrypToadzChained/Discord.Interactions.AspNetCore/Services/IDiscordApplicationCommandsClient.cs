using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents a Discord API client that can register application commands.</summary>
    public interface IDiscordApplicationCommandsClient
    {
        /// <summary>Registers global commands.</summary>
        /// <param name="commands">Commands to register.</param>
        /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
        /// <returns>Collection of registered commands</returns>
        Task<IEnumerable<DiscordApplicationCommand>> RegisterGlobalCommandsAsync(IEnumerable<DiscordApplicationCommand> commands, CancellationToken cancellationToken = default);
        /// <summary>Registers guild commands.</summary>
        /// <param name="guildID">ID of the guild the commands are being registered for.</param>
        /// <param name="commands">Commands to register.</param>
        /// <param name="cancellationToken">Cancellation token to cancel the request.</param>
        /// <returns>Collection of registered commands</returns>
        Task<IEnumerable<DiscordApplicationCommand>> RegisterGuildCommandsAsync(ulong guildID, IEnumerable<DiscordApplicationCommand> commands, CancellationToken cancellationToken = default);
    }
}
