namespace Discord.Interactions.AspNetCore.CommandsHandling.Services
{
    public interface IDiscordInteractionCommandHandlerProvider
    {
        IDiscordInteractionCommandHandler GetHandler(ulong commandId);
    }
}
