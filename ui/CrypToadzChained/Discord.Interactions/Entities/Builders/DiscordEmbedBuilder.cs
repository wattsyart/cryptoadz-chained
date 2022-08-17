using System;
using System.Collections.Generic;
using System.Linq;

namespace TehGM.Discord
{
    /// <summary>A builder that helps with creating a new <see cref="DiscordEmbed"/> instance.</summary>
    public class DiscordEmbedBuilder
    {
        /// <summary>The title of the embed.</summary>
        public string Title { get; set; }
        /// <summary>The description of the embed.</summary>
        public string Description { get; set; }
        /// <summary>type of embed (always "rich" for webhook embeds)</summary>
        public DiscordEmbedType? Type { get; set; }
        /// <summary>url of embed</summary>
        public string URL { get; set; }
        /// <summary>timestamp of embed content</summary>
        public DateTimeOffset? Timestamp { get; set; }
        /// <summary>color code of the embed</summary>
        public DiscordColor? Color { get; set; }
        /// <summary>Footer information.</summary>
        public DiscordEmbedFooter Footer { get; set; }
        /// <summary>Image information.</summary>
        public DiscordEmbedMedia Image { get; set; }
        /// <summary>Thumbnail information.</summary>
        public DiscordEmbedMedia Thumbnail { get; set; }
        /// <summary>Video information.</summary>
        public DiscordEmbedMedia Video { get; set; }
        /// <summary>Provider information.</summary>
        public DiscordEmbedProvider Provider { get; set; }
        /// <summary>Author information.</summary>
        public DiscordEmbedAuthor Author { get; set; }
        /// <summary>Collection of embed's fields.</summary>
        public ICollection<DiscordEmbedField> Fields { get; set; }

        /// <summary>Creates a builder for a new Discord embed.</summary>
        public DiscordEmbedBuilder()
        {
            this.Type = DiscordEmbedType.Rich;
        }

        private DiscordEmbedBuilder Modify(Action<DiscordEmbedBuilder> builder)
        {
            builder.Invoke(this);
            return this;
        }

        /// <summary>Sets title of the embed.</summary>
        /// <param name="title">Embed title.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithTitle(string title)
            => this.Modify(embed => embed.Title = title);
        /// <summary>Sets description of the embed.</summary>
        /// <param name="description">Embed description.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithDescription(string description)
            => this.Modify(embed => embed.Description = description);
        /// <summary>Changes the embed type.</summary>
        /// <param name="type">Type of the embed.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithType(DiscordEmbedType? type)
            => this.Modify(embed => embed.Type = type);
        /// <summary>Sets URL of the embed.</summary>
        /// <param name="url">Embed URL.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithURL(string url)
            => this.Modify(embed => embed.URL = url);
        /// <summary>Sets color of the embed.</summary>
        /// <param name="color">Embed color.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithColor(DiscordColor? color)
            => this.Modify(embed => embed.Color = color);

        /// <summary>Sets timestamp of the embed.</summary>
        /// <param name="timestamp">Embed timestamp.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithTimestamp(DateTimeOffset? timestamp)
            => this.Modify(embed => embed.Timestamp = timestamp);
        /// <summary>Sets timestamp of the embed.</summary>
        /// <param name="timestamp">Embed timestamp.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithTimestamp(DateTime? timestamp)
            => this.WithTimestamp(timestamp.HasValue ? (DateTimeOffset?)new DateTimeOffset(timestamp.Value) : null);
        /// <summary>Sets timestamp of the embed to current date and time.</summary>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithCurrentTimestamp()
            => this.WithTimestamp(DateTimeOffset.UtcNow);

        /// <summary>Sets footer of the embed.</summary>
        /// <param name="footer">Embed footer.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithFooter(DiscordEmbedFooter footer)
            => this.Modify(embed => embed.Footer = footer);
        /// <summary>Sets footer of the embed.</summary>
        /// <param name="text">Text of the footer.</param>
        /// <param name="iconURL">The URL of footer icon (only supports http(s) and attachments).</param>
        /// <param name="proxyIconURL">The proxied URL of footer icon.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithFooter(string text, string iconURL = null, string proxyIconURL = null)
            => this.WithFooter(new DiscordEmbedFooter(text, iconURL) { ProxyIconURL = proxyIconURL });

        /// <summary>Sets image of the embed.</summary>
        /// <param name="image">Embed image.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithImage(DiscordEmbedMedia image)
            => this.Modify(embed => embed.Image = image);
        /// <summary>Sets image of the embed.</summary>
        /// <param name="imageURL">Source URL of the image.</param>
        /// <param name="proxyImageURL">Proxied URL of the image.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithImage(string imageURL, string proxyImageURL = null)
            => this.WithImage(new DiscordEmbedMedia(imageURL) { ProxyURL = proxyImageURL });

        /// <summary>Sets thumbnail of the embed.</summary>
        /// <param name="thumbnail">Embed thumbnail.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithThumbnail(DiscordEmbedMedia thumbnail)
            => this.Modify(embed => embed.Thumbnail = thumbnail);
        /// <summary>Sets thumbnail of the embed.</summary>
        /// <param name="thumbnailURL">Source URL of the thumbnail.</param>
        /// <param name="proxyThumbnailURL">Proxied URL of the thumbnail.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithThumbnail(string thumbnailURL, string proxyThumbnailURL = null)
            => this.WithThumbnail(new DiscordEmbedMedia(thumbnailURL) { ProxyURL = proxyThumbnailURL });

        /// <summary>Sets author of the embed.</summary>
        /// <param name="author">Embed author.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithAuthor(DiscordEmbedAuthor author)
            => this.Modify(embed => embed.Author = author);
        /// <summary>Sets author of the embed.</summary>
        /// <param name="name">The name of the author.</param>
        /// <param name="url">The URL of the author.</param>
        /// <param name="iconURL">The URL of author icon (only supports http(s) and attachments).</param>
        /// <param name="proxyIconURL">The proxied URL of author icon.</param>
        /// <returns>Current builder.</returns>
        public DiscordEmbedBuilder WithAuthor(string name, string url, string iconURL = null, string proxyIconURL = null)
            => this.WithAuthor(new DiscordEmbedAuthor(name, url, iconURL) { ProxyIconURL = proxyIconURL });

        /// <summary>Adds a field to the embed.</summary>
        /// <param name="field">Field to add.</param>
        public DiscordEmbedBuilder AddField(DiscordEmbedField field)
        {
            if (this.Fields == null)
                this.Fields = new List<DiscordEmbedField>();
            this.Fields.Add(field);
            return this;
        }

        /// <summary>Adds a field to the embed.</summary>
        /// <param name="name">Name of the field.</param>
        /// <param name="value">Text value of the field.</param>
        /// <param name="inline">Whether the field is inline.</param>
        public DiscordEmbedBuilder AddField(string name, string value, bool? inline = null)
            => this.AddField(new DiscordEmbedField(name, value, inline));

        /// <summary>Builds the embed.</summary>
        /// <returns>A new isntance of a Discord Embed.</returns>
        public DiscordEmbed Build()
        {
            DiscordEmbed result = new DiscordEmbed();
            result.Title = this.Title;
            result.Description = this.Description;
            result.Type = this.Type;
            result.URL = this.URL;
            result.Timestamp = this.Timestamp;
            result.Color = this.Color;
            result.Footer = this.Footer;
            result.Image = this.Image;
            result.Thumbnail = this.Thumbnail;
            result.Video = this.Video;
            result.Provider = this.Provider;
            result.Author = this.Author;
            if (this.Fields?.Any() == true)
                result.Fields = this.Fields;
            return result;
        }
    }
}
