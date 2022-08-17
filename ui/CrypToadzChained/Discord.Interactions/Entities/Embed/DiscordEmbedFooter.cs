using System;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Discord Embed Footer information.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure"/>
    public class DiscordEmbedFooter
    {
        /// <summary>Max length of footers's <see cref="Text"/>.</summary>
        public const int MaxTextLength = 2048;

        [JsonProperty("text", Required = Required.Always)]
        private string _text;

        /// <summary>The text of the footer.</summary>
        /// <exception cref="InvalidOperationException">The value is longer than <see cref="MaxTextLength"/>.</exception>
        /// <exception cref="ArgumentNullException">The value is null or empty.</exception>
        [JsonIgnore]
        public string Text
        {
            get => this._text;
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentNullException(nameof(this.Text));
                if (value.Length > MaxTextLength)
                    throw new InvalidOperationException($"Discord embed footer's {nameof(this.Text)} can only have up to {MaxTextLength} characters.");
                this._text = value;
            }
        }
        /// <summary>The URL of footer icon (only supports http(s) and attachments).</summary>
        [JsonProperty("icon_url", NullValueHandling = NullValueHandling.Ignore)]
        public string IconURL { get; set; }
        /// <summary>The proxied URL of footer icon.</summary>
        [JsonProperty("proxy_icon_url", NullValueHandling = NullValueHandling.Ignore)]
        public string ProxyIconURL { get; set; }

        /// <summary>Creates a new instance of Discord Embed Footer information.</summary>
        /// <param name="text">The text of the footer.</param>
        /// <param name="iconUrl">The URL of footer icon (only supports http(s) and attachments).</param>
        /// <exception cref="InvalidOperationException"><paramref name="text"/> is longer than <see cref="MaxTextLength"/>.</exception>
        /// <exception cref="ArgumentNullException"><paramref name="text"/> is null or empty.</exception>
        public DiscordEmbedFooter(string text, string iconUrl = null)
        {
            this.Text = text;
            this.IconURL = iconUrl;
        }
    }
}
