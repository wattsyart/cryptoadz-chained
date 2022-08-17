using System;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Represents a Discord message.</summary>
    /// <remarks>This class does not yet support all properties.</remarks>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#message-object-message-structure"/>
    public class DiscordMessage
    {
        /// <summary>id of the message</summary>
        [JsonProperty("id")]
        public ulong ID { get; private set; }
        /// <summary>id of the channel the message was sent in</summary>
        [JsonProperty("channel_id")]
        public ulong ChannelID { get; private set; }
        /// <summary>id of the guild the message was sent in</summary>
        [JsonProperty("guild_id", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? GuildID { get; private set; }
        /// <summary>the author of this message</summary>
        [JsonProperty("author")]
        public DiscordUser Author { get; private set; }
        /// <summary>member properties for this message's author</summary>
        [JsonProperty("member", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordGuildMember GuildMember { get; private set; }
        /// <summary>contents of the message</summary>
        [JsonProperty("content")]
        public string Content { get; private set; }
        /// <summary>when this message was sent</summary>
        [JsonProperty("timestamp")]
        public DateTime Timestamp { get; private set; }
        /// <summary>when this message was edited (or null if never)</summary>
        [JsonProperty("edited_timestamp", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? EditTimestamp { get; private set; }
        /// <summary>whether this was a TTS message</summary>
        [JsonProperty("tts")]
        public bool IsTTS { get; private set; }
        /// <summary>whether this message mentions everyone</summary>
        [JsonProperty("mention_everyone")]
        public bool MentionsEveryone { get; private set; }

        // TODO: add other properties - https://discord.com/developers/docs/resources/channel#message-object-message-structure

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordMessage() { }
    }
}