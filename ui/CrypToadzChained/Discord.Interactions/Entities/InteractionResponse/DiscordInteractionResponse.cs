using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents a response to a Discord Interaction.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction"/>
    public class DiscordInteractionResponse
    {
        /// <summary>A pre-created Pong response.</summary>
        public static DiscordInteractionResponse Pong { get; } = new DiscordInteractionResponse(DiscordInteractionResponseType.Pong);

        /// <summary>The type of the response.</summary>
        [JsonProperty("type", Required = Required.Always)]
        public DiscordInteractionResponseType Type { get; private set; }
        /// <summary>an optional response message</summary>
        [JsonProperty("data", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordInteractionResponseData Data { get; set; }

        /// <summary>Creates a new Interaction Response.</summary>
        /// <param name="type">Type of the response.</param>
        public DiscordInteractionResponse(DiscordInteractionResponseType type)
        {
            this.Type = type;
        }
    }
}
