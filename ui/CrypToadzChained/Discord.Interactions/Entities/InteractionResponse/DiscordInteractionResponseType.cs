namespace TehGM.Discord.Interactions
{
    /// <summary>Type of Discord Interaction response.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type"/>
    public enum DiscordInteractionResponseType
    {
        /// <summary>ACK a Ping</summary>
        Pong = 1,
        /// <summary>respond to an interaction with a message</summary>
        ChannelMessageWithSource = 4,
        /// <summary>ACK an interaction and edit a response later, the user sees a loading state</summary>
        DeferredChannelMessageWithSource = 5,
        /// <summary>for components, ACK an interaction and edit the original message later; the user does not see a loading state</summary>
        DeferredUpdateMessage = 6,
        /// <summary>for components, edit the message the component was attached to</summary>
        UpdateMessage = 7
    }
}
