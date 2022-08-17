using System;
using System.Collections.Generic;
using System.Text;
using TehGM.Discord.Serialization;

namespace TehGM.Discord
{
    /// <summary>A set of simple utilties for formatting Discord messages.</summary>
    public static class DiscordFormatter
    {
        // ESCAPING
        private static HashSet<char> _escapeChars = new HashSet<char> { '*', '`', '<', '[', '~', '_' };
        /// <summary>Escapes the text, preventing the Discord client from applying formatting.</summary>
        /// <param name="text">The text to escape.</param>
        /// <returns>Escaped text.</returns>
        public static string Escape(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return text;

            StringBuilder builder = new StringBuilder(text);
            for (int i = 0; i < builder.Length; i++)
            {
                char c = builder[i];
                if (!_escapeChars.Contains(c))
                    continue;

                builder.Insert(i, '\\');
                i++;
            }
            return builder.ToString();
        }

        // GENERAL
        /// <summary>Builds a named, ie link with user-friendly text.</summary>
        /// <param name="name">The display name of the link.</param>
        /// <param name="url">The link value.</param>
        /// <returns>The formatted result.</returns>
        public static string NamedLink(string name, string url)
            => $"[{name}]({url})";

        /// <summary>Formats provided text as italic.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string Italic(string text)
            => $"*{text}*";
        /// <summary>Formats provided text as bold.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string Bold(string text)
            => $"**{text}**";
        /// <summary>Formats provided text as bold and italic.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string BoldItalic(string text)
            => Bold(Italic(text));

        /// <summary>Adds a strikeout to the provided text.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string Strikeout(string text)
            => $"~~{text}~~";

        /// <summary>Underlines the provided text.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string Underline(string text)
            => $"__{text}__";

        /// <summary>Formats the provided text to display as a quote.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string Quote(string text)
            => $"> {text}";
        /// <summary>Formats the provided text to display as a quote. 
        /// This formatting applies until the end of the message contents.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string MultilineQuote(string text)
            => $">>> {text}";

        /// <summary>Formats provided text as inline code.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string InlineCode(string text)
            => $"`{text}`";

        /// <summary>Formats provided text as multiline code block, applying specified language highlight.</summary>
        /// <param name="text">The text to format.</param>
        /// <param name="language">Language code for highlighting.</param>
        /// <returns>The formatted result.</returns>
        public static string CodeBlock(string text, string language)
            => $"```{(string.IsNullOrWhiteSpace(language) ? string.Empty : language)}\n{text}\n```";
        /// <summary>Formats provided text as multiline code block, without any language highlight.</summary>
        /// <param name="text">The text to format.</param>
        /// <returns>The formatted result.</returns>
        public static string CodeBlock(string text)
            => CodeBlock(text, null);

        // MENTIONS
        /// <summary>Generates a user mention.</summary>
        /// <param name="id">ID of the user to mention.</param>
        /// <param name="withNickname">Whether the mention should use user's guild member nickname if possible.</param>
        /// <returns>The generated mention text.</returns>
        public static string MentionUser(ulong id, bool withNickname = true)
        {
            if (withNickname)
                return $"<@!{id}>";
            else
                return $"<@{id}>";
        }
        /// <summary>Generates a channel mention.</summary>
        /// <param name="id">ID of the channel to mention.</param>
        /// <returns>The generated mention text.</returns>
        public static string MentionChannel(ulong id)
            => $"<#{id}>";
        /// <summary>Generates a role mention.</summary>
        /// <param name="id">ID of the role to mention.</param>
        /// <returns>The generated mention text.</returns>
        public static string MentionRole(ulong id)
            => $"<@&{id}>";

        // EMOJIS
        /// <summary>Generates a custom emoji text.</summary>
        /// <param name="name">Name of the emoji.</param>
        /// <param name="id">ID of the emoji.</param>
        /// <returns>The generated emoji text.</returns>
        public static string CustomEmoji(string name, ulong id)
            => $"<:{name}:{id}>";
        /// <summary>Generates a custom animated emoji text.</summary>
        /// <param name="name">Name of the emoji.</param>
        /// <param name="id">ID of the emoji.</param>
        /// <returns>The generated emoji text.</returns>
        public static string CustomAnimatedEmoji(string name, ulong id)
            => $"<a:{name}:{id}>";

        // TIMESTAMP
        /// <summary>Generates a timezone-aware timestamp.</summary>
        /// <param name="timestamp">The timestamp to format.</param>
        /// <param name="style">Style of the timestamp.</param>
        /// <returns>The generated timestamp text.</returns>
        public static string Timestamp(DateTime timestamp, TimestampStyle style = TimestampStyle.ShortDateTime)
        {
            char styleChar;
            switch (style)
            {
                case TimestampStyle.ShortTime:
                    styleChar = 't';
                    break;
                case TimestampStyle.LongTime:
                    styleChar = 'T';
                    break;
                case TimestampStyle.ShortDate:
                    styleChar = 'd';
                    break;
                case TimestampStyle.LongDate:
                    styleChar = 'D';
                    break;
                case TimestampStyle.ShortDateTime:
                    styleChar = 'f';
                    break;
                case TimestampStyle.LongDateTime:
                    styleChar = 'F';
                    break;
                case TimestampStyle.RelativeTime:
                    styleChar = 'R';
                    break;
                default:
                    throw new ArgumentException("Unrecognized timestamp style", nameof(style));
            }

            return $"<t:{UnixTimestampConverter.ToUnixTimestamp(timestamp)}:{styleChar}>";
        }
        /// <summary>Generates a timezone-aware timestamp.</summary>
        /// <param name="timestamp">The timestamp to format.</param>
        /// <param name="style">Style of the timestamp.</param>
        /// <returns>The generated timestamp text.</returns>
        public static string Timestamp(DateTimeOffset timestamp, TimestampStyle style = TimestampStyle.ShortDateTime)
            => Timestamp(timestamp.UtcDateTime, style);

        /// <summary>Displayed timestamp style.</summary>
        public enum TimestampStyle
        {
            /// <summary>16:20</summary>
            ShortTime,
            /// <summary>16:20:30</summary>
            LongTime,
            /// <summary>20/04/2021</summary>
            ShortDate,
            /// <summary>20 April 2021</summary>
            LongDate,
            /// <summary>20 April 2021 16:20</summary>
            ShortDateTime,
            /// <summary>Tuesday, 20 April 2021 16:20</summary>
            LongDateTime,
            /// <summary>2 months ago</summary>
            RelativeTime
        }
    }
}
