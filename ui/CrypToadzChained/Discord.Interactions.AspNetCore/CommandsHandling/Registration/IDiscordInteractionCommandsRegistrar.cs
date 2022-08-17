using Microsoft.Extensions.Hosting;

namespace TehGM.Discord.Interactions.CommandsHandling.Registration
{
    /// <summary>Represents an <see cref="IHostedService"/> that can be used for commands registration.</summary>
    /// <remarks>This blank interface exists mainly so it is possible to make the library use a different hosted service to register the commands.</remarks>
    public interface IDiscordInteractionCommandsRegistrar : IHostedService { }
}
