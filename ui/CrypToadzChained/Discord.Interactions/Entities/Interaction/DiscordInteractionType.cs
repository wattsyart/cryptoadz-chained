namespace TehGM.Discord.Interactions
{
    /// <summary>Type of Discord Interaction.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type"/>
    public enum DiscordInteractionType
    {
        /// <summary>A ping interaction.</summary>
        Ping = 1,
        /// <summary>An application command.</summary>
        ApplicationCommand = 2,
        /// <summary>A message component.</summary>
        MessageComponent = 3
    }
}
