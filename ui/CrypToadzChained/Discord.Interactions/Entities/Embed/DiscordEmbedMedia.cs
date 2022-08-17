using System;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Information for Discord Embed media, such as <see cref="DiscordEmbed.Image"/>, <see cref="DiscordEmbed.Thumbnail"/> or <see cref="DiscordEmbed.Video"/>.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure"/>
    public class DiscordEmbedMedia
    {
        [JsonProperty("url", Required = Required.Always)]
        private string _url;

        /// <summary>Source URL of the media.</summary>
        /// <exception cref="ArgumentNullException">The value is null or empty.</exception>
        [JsonIgnore]
        public string URL
        {
            get => this._url;
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentNullException(nameof(this.URL));
                this._url = value;
            }
        }
        /// <summary>Proxied URL of the media.</summary>
        [JsonProperty("proxy_url", NullValueHandling = NullValueHandling.Ignore)]
        public string ProxyURL { get; set; }
        /// <summary>Height of the media.</summary>
        [JsonProperty("height", NullValueHandling = NullValueHandling.Ignore)]
        public int? Height { get; set; }
        /// <summary>Width of the media.</summary>
        [JsonProperty("width", NullValueHandling = NullValueHandling.Ignore)]
        public int? Width { get; set; }

        /// <summary>Creates a new instance of Discord Embed Media information.</summary>
        /// <param name="url">Source URL of the media.</param>
        /// <exception cref="ArgumentNullException"><paramref name="url"/> is null or empty.</exception>
        public DiscordEmbedMedia(string url)
        {
            this.URL = url;
        }
    }
}
