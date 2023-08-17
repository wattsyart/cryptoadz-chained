using Newtonsoft.Json;

namespace Discord.Interactions.Entities.Embed
{
    /// <summary>Discord Embed Provider information.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure"/>
    public class DiscordEmbedProvider
    {
        /// <summary>Name of the provider.</summary>
        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }
        /// <summary>URL of the provider.</summary>
        [JsonProperty("url", NullValueHandling = NullValueHandling.Ignore)]
        public string URL { get; set; }
    }
}
