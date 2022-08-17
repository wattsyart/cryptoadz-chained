using System.Collections.Generic;
using Newtonsoft.Json;
using TehGM.Discord.Serialization;

namespace TehGM.Discord.Interactions
{
    /// <summary>Data for <see cref="DiscordInteractionResponse"/>.</summary>
    /// <remarks>This class currently doesn't support message components.</remarks>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure"/>
    public class DiscordInteractionResponseData
    {
        /// <summary>Whether the response is TTS.</summary>
        [JsonProperty("tts", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsTTS { get; set; }
        /// <summary>The message text content.</summary>
        [JsonProperty("content", NullValueHandling = NullValueHandling.Ignore)]
        public string Content { get; set; }
        /// <summary>Up to 10 embeds added to this response.</summary>
        [JsonProperty("embeds", NullValueHandling = NullValueHandling.Ignore)]
        public ICollection<DiscordEmbed> Embeds { get; set; }
        /// <summary>Allowed mentions object specifying which mentions will ping.</summary>
        [JsonProperty("allowed_mentions", NullValueHandling = NullValueHandling.Ignore)]
        [JsonConverter(typeof(DiscordAllowedMentionsConverter))]
        public DiscordAllowedMentions AllowedMentions { get; set; }
        /// <summary>Interaction response data flags.</summary>
        [JsonProperty("flags", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordInteractionResponseFlags? Flags { get; set; }

        // TODO: add components (sheesh)
    }
}
