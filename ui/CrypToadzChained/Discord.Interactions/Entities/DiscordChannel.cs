using System;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Represents a Discord Channel.</summary>
    /// <remarks>This is partial object - interactions only include a few properties.</remarks>
    public class DiscordChannel
    {
        /// <summary>the id of this channel</summary>
        [JsonProperty("id")]
        public ulong ID { get; private set; }
        /// <summary>the type of channel</summary>
        [JsonProperty("type")]
        public DiscordChannelType Type { get; private set; }
        /// <summary>the name of the channel (1-100 characters)</summary>
        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; private set; }
        /// <summary>computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction</summary>
        [JsonProperty("permissions", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? Permissions { get; private set; }

        // thread only
        /// <summary>for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created</summary>
        [JsonProperty("parent_id", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? ParentID { get; private set; }
        /// <summary>thread-specific fields not needed by other channels</summary>
        [JsonProperty("thread_metadata", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordThreadMetadata ThreadMetadata { get; private set; }

        /// <summary>Whether this channel is a thread.</summary>
        [JsonIgnore]
        public bool IsThread => this.ParentID != null && this.ThreadMetadata != null;

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordChannel() { }
    }

    /// <summary>Metadata of a Discord thread.</summary>
    public class DiscordThreadMetadata
    {
        /// <summary>whether the thread is archived</summary>
        [JsonProperty("archived")]
        public bool IsArchived { get; private set; }
        /// <summary>duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080</summary>
        [JsonProperty("auto_archive_duration")]
        public int AutoArchiveMinutes { get; private set; }
        /// <summary>timestamp when the thread's archive status was last changed, used for calculating recent activity</summary>
        [JsonProperty("archive_timestamp")]
        public DateTimeOffset ArchiveTimestamp { get; private set; }
        /// <summary>whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it</summary>
        [JsonProperty("locked")]
        public bool IsLocked { get; private set; }
        /// <summary>whether non-moderators can add other non-moderators to a thread; only available on private threads</summary>
        [JsonProperty("invitable", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsInvitable { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordThreadMetadata() { }
    }

    /// <summary>Type of a Discord Channel.</summary>
    public enum DiscordChannelType
    {
        /// <summary>a text channel within a server</summary>
        GuildText = 0,
        /// <summary>a direct message between users</summary>
        DM = 1,
        /// <summary>a voice channel within a server</summary>
        GuildVoice = 2,
        /// <summary>a direct message between multiple users</summary>
        GroupDM = 3,
        /// <summary>an organizational category that contains up to 50 channels</summary>
        GuildCategory = 4,
        /// <summary>a channel that users can follow and crosspost into their own server</summary>
        GuildNews = 5,
        /// <summary>a channel in which game developers can sell their game on Discord</summary>
        GuildStore = 6,
        /// <summary>a temporary sub-channel within a <see cref="GuildText"/> channel</summary>
        GuildNewsThread = 10,
        /// <summary>a temporary sub-channel within a <see cref="GuildText"/> channel</summary>
        GuildPublicThread = 11,
        /// <summary>a temporary sub-channel within a <see cref="GuildText"/> channel that is only viewable by those invited and those with the MANAGE_THREADS permission</summary>
        GuildPrivateThread = 12,
        /// <summary>a voice channel for hosting events with an audience</summary>
        GuildStageVoice = 13
    }
}
