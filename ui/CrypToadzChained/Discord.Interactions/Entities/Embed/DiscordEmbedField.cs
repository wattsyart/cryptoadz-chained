using System;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Discord embed's field.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure"/>
    public class DiscordEmbedField
    {
        /// <summary>Max length of fields's <see cref="Name"/>.</summary>
        public const int MaxNameLength = 256;
        /// <summary>Max length of fields's <see cref="Value"/>.</summary>
        public const int MaxValueLength = 1024;

        [JsonProperty("name", Required = Required.Always)]
        private string _name;
        [JsonProperty("value", Required = Required.Always)]
        private string _value;

        /// <summary>The name of the field.</summary>
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
                    throw new InvalidOperationException($"Discord embed field's {nameof(this.Name)} can only have up to {MaxNameLength} characters.");
                this._name = value;
            }
        }
        /// <summary>The value of the field.</summary>
        /// <exception cref="InvalidOperationException">The value is longer than <see cref="MaxValueLength"/>.</exception>
        /// <exception cref="ArgumentNullException">The value is null or empty.</exception>
        [JsonIgnore]
        public string Value
        {
            get => this._value;
            set
            {
                if (string.IsNullOrEmpty(value))
                    throw new ArgumentNullException(nameof(this.Value));
                if (value.Length > MaxValueLength)
                    throw new InvalidOperationException($"Discord embed field's {nameof(this.Value)} can only have up to {MaxValueLength} characters.");
                this._value = value;
            }
        }
        [JsonProperty("inline", NullValueHandling = NullValueHandling.Ignore)]
        private bool? _isInline;
        /// <summary>Whether the field is inline.</summary>
        [JsonIgnore]
        public bool IsInline
        {
            get => this._isInline ?? false;
            set => this._isInline = value;
        }

        /// <summary>Creates a new Discord Embed Field.</summary>
        /// <param name="name">The name of the field.</param>
        /// <param name="value">The value of the field.</param>
        /// <param name="inline">Whether this field is inline.</param>
        /// <exception cref="InvalidOperationException"><paramref name="name"/> or <paramref name="value"/> is of invalid length.</exception>
        /// <exception cref="ArgumentNullException"><paramref name="name"/> or <paramref name="value"/> is null or empty.</exception>
        public DiscordEmbedField(string name, string value, bool? inline = null)
        {
            this.Name = name;
            this.Value = value;
            this._isInline = inline;
        }
    }
}
