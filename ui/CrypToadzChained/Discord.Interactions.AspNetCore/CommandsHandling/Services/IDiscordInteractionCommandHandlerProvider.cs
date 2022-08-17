namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Provides scoped access to command interaction handlers.</summary>
    public interface IDiscordInteractionCommandHandlerProvider
    {
        /// <summary>Gets a command handler for a specific command ID.</summary>
        /// <param name="commandID">ID of the command. Must match Discord's command ID.</param>
        /// <returns>Command handler instance.</returns>
        IDiscordInteractionCommandHandler GetHandler(ulong commandID);
    }
}
