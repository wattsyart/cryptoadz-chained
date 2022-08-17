namespace TehGM.Discord.Interactions
{
    /// <summary>Flags for a Discord Interaction response.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-flags"/>
    public enum DiscordInteractionResponseFlags
    {
        /// <summary>Only the user receiving the message can see it.</summary>
        Ephemeral = 1 << 6
    }
}
