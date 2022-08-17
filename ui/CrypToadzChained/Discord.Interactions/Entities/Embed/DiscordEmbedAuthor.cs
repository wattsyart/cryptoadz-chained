using System;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Discord Embed Author information.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure"/>
    public class DiscordEmbedAuthor
    {
        /// <summary>Max length of author's <see cref="Name"/>.</summary>
        public const int MaxNameLength = 256;

        [JsonProperty("name", Required = Required.Always)]
        private string _name;

        /// <summary>The name of the author.</summary>
        /// <exception cref="InvalidOperationException">The value is longer than <see cref="MaxNameLength"/>.</exception>
        /// <exception cref="ArgumentNullException">The value is null or empty.</exception>
        [JsonIgnore]
        public string Name
        {
            get => this._name;
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentNullException(nameof(this.Name));
                if (value.Length > MaxNameLength)
                    throw new InvalidOperationException($"Discord embed author's {nameof(this.Name)} can only have up to {MaxNameLength} characters.");
                this._name = value;
            }
        }
        /// <summary>The URL of the author.</summary>
        [JsonProperty("url", NullValueHandling = NullValueHandling.Ignore)]
        public string URL { get; set; }
        /// <summary>The URL of author icon (only supports http(s) and attachments).</summary>
        [JsonProperty("icon_url", NullValueHandling = NullValueHandling.Ignore)]
        public string IconURL { get; set; }
        /// <summary>The proxied URL of author icon.</summary>
        [JsonProperty("proxy_icon_url", NullValueHandling = NullValueHandling.Ignore)]
        public string ProxyIconURL { get; set; }

        /// <summary>Creates a new instance of Discord Embed Author information.</summary>
        /// <param name="name">The name of the author.</param>
        /// <param name="url">The URL of the author.</param>
        /// <param name="iconUrl">The URL of author icon (only supports http(s) and attachments).</param>
        /// <exception cref="InvalidOperationException"><paramref name="name"/> is longer than <see cref="MaxNameLength"/>.</exception>
        /// <exception cref="ArgumentNullException"><paramref name="name"/> is null or empty.</exception>
        public DiscordEmbedAuthor(string name, string url = null, string iconUrl = null)
        {
            this.Name = name;
            this.URL = url;
            this.IconURL = iconUrl;
        }
    }
}
