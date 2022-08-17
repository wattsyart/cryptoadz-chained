using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TehGM.Discord
{
    /// <summary>A Discord embed.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object"/>
    public class DiscordEmbed
    {
        /// <summary>Max length of embed's <see cref="Title"/>.</summary>
        public const int MaxTitleLength = 256;
        /// <summary>Max length of embed's <see cref="Description"/>.</summary>
        public const int MaxDescriptionLength = 4096;
        /// <summary>Max count of embed's <see cref="Fields"/>.</summary>
        public const int MaxFieldsCount = 25;

        [JsonProperty("title", NullValueHandling = NullValueHandling.Ignore)]
        private string _title;
        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        private string _description;
        [JsonProperty("fields", NullValueHandling = NullValueHandling.Ignore)]
        private ICollection<DiscordEmbedField> _fields;

        /// <summary>The title of the embed.</summary>
        /// <exception cref="InvalidOperationException">The value is longer than <see cref="MaxTitleLength"/>.</exception>
        [JsonIgnore]
        public string Title
        {
            get => this._title;
            set
            {
                if (value != null && value.Length > MaxTitleLength)
                    throw new InvalidOperationException($"Discord embed's {nameof(this.Title)} can only have up to {MaxTitleLength} characters.");
                this._title = value;
            }
        }
        /// <summary>The description of the embed.</summary>
        /// <exception cref="InvalidOperationException">The value is longer than <see cref="MaxDescriptionLength"/>.</exception>
        [JsonIgnore]
        public string Description
        {
            get => this._description;
            set
            {
                if (value != null && value.Length > MaxDescriptionLength)
                    throw new InvalidOperationException($"Discord embed's {nameof(this.Description)} can only have up to {MaxDescriptionLength} characters.");
                this._description = value;
            }
        }
        /// <summary>type of embed (always "rich" for webhook embeds)</summary>
        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        [JsonConverter(typeof(StringEnumConverter), new object[] { true })]
        public DiscordEmbedType? Type { get; set; } = DiscordEmbedType.Rich;
        /// <summary>url of embed</summary>
        [JsonProperty("url", NullValueHandling = NullValueHandling.Ignore)]
        public string URL { get; set; }
        /// <summary>timestamp of embed content</summary>
        [JsonProperty("timestamp", NullValueHandling = NullValueHandling.Ignore)]
        public DateTimeOffset? Timestamp { get; set; }
        /// <summary>color code of the embed</summary>
        [JsonProperty("color", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordColor? Color { get; set; }
        /// <summary>Footer information.</summary>
        [JsonProperty("footer", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordEmbedFooter Footer { get; set; }
        /// <summary>Image information.</summary>
        [JsonProperty("image", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordEmbedMedia Image { get; set; }
        /// <summary>Thumbnail information.</summary>
        [JsonProperty("thumbnail", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordEmbedMedia Thumbnail { get; set; }
        /// <summary>Video information.</summary>
        [JsonProperty("video", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordEmbedMedia Video { get; set; }
        /// <summary>Provider information.</summary>
        [JsonProperty("provider", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordEmbedProvider Provider { get; set; }
        /// <summary>Author information.</summary>
        [JsonProperty("author", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordEmbedAuthor Author { get; set; }
        /// <summary>Collection of embed's fields.</summary>
        /// <exception cref="InvalidOperationException">The count of fields is greater than <see cref="MaxFieldsCount"/>.</exception>
        [JsonIgnore]
        public ICollection<DiscordEmbedField> Fields
        {
            get => this._fields;
            set
            {
                if (value != null && value.Count > MaxFieldsCount)
                    throw new InvalidOperationException($"Discord embed only supports {MaxFieldsCount} fields.");
                this._fields = value;
            }
        }

        /// <summary>Adds a field to the embed.</summary>
        /// <param name="field">Field to add.</param>
        /// <exception cref="InvalidOperationException">The count of fields is greater than <see cref="MaxFieldsCount"/>.</exception>
        public void AddField(DiscordEmbedField field)
        {
            if (this.Fields == null)
                this.Fields = new List<DiscordEmbedField>();
            if (this.Fields.Count >= MaxFieldsCount)
                throw new InvalidOperationException($"Discord embed only supports {MaxFieldsCount} fields.");
            this.Fields.Add(field);
        }

        /// <summary>Adds a field to the embed.</summary>
        /// <param name="name">Name of the field.</param>
        /// <param name="value">Text value of the field.</param>
        /// <param name="inline">Whether the field is inline.</param>
        /// <exception cref="InvalidOperationException">The count of fields is greater than <see cref="MaxFieldsCount"/>.</exception>
        public void AddField(string name, string value, bool? inline = null)
            => this.AddField(new DiscordEmbedField(name, value, inline));
    }

}
