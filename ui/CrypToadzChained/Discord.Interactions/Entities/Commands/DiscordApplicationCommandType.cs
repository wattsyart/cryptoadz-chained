namespace TehGM.Discord.Interactions
{
    /// <summary>Type of a Discord Application Command.</summary>
    public enum DiscordApplicationCommandType
    {
        /// <summary>User typed a slash command.</summary>
        /// <seealso cref="https://discord.com/developers/docs/interactions/application-commands#slash-commands"/>
        ChatInput = 1,
        /// <summary>User right clicked on a user.</summary>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#user-commands"/>
        User = 2,
        /// <summary>User right clicked on a message.</summary>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#message-commands"/>
        Message = 3
    }
}
