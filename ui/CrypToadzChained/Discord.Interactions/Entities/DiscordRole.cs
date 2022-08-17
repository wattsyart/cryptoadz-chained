using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Represents a Discord user role.</summary>
    /// <seealso href="https://discord.com/developers/docs/topics/permissions#role-object"/>
    public class DiscordRole
    {
        /// <summary>Role ID.</summary>
        [JsonProperty("id", Required = Required.Always)]
        public ulong ID { get; private set; }
        /// <summary>Role name.</summary>
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; private set; }
        /// <summary>Color of this role.</summary>
        [JsonProperty("color", Required = Required.Always)]
        public DiscordColor Color { get; private set; }
        /// <summary>if this role is pinned in the user listing</summary>
        [JsonProperty("hoist", Required = Required.Always)]
        public bool IsPinned { get; private set; }
        /// <summary>Role icon hash.</summary>
        /// <seealso href="https://discord.com/developers/docs/reference#image-formatting"/>
        [JsonProperty("icon")]
        public string IconHash { get; private set; }
        /// <summary>position of this role</summary>
        [JsonProperty("position", Required = Required.Always)]
        public int Position { get; private set; }
        /// <summary>permission bit set</summary>
        [JsonProperty("permissions", Required = Required.Always)]
        public ulong Permissions { get; private set; }
        /// <summary>whether this role is managed by an integration</summary>
        [JsonProperty("managed", Required = Required.Always)]
        public bool IsManaged { get; private set; }
        /// <summary>whether this role is mentionable</summary>
        [JsonProperty("mentionable", Required = Required.Always)]
        public bool IsMentionable { get; private set; }
        /// <summary>the tags this role has</summary>
        [JsonProperty("tags", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordRoleTags Tags { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordRole() { }
    }

    /// <summary>Tags of Discord user role.</summary>
    /// <seealso href="https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure"/>
    public class DiscordRoleTags
    {
        /// <summary>the id of the bot this role belongs to</summary>
        [JsonProperty("bot_id", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? BotID { get; private set; }
        /// <summary>the id of the integration this role belongs to</summary>
        [JsonProperty("integration_id", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? IntegrationID { get; private set; }
        /// <summary>whether this is the guild's premium subscriber role</summary>
        // premium_subscriber is of type null according to docs????
        [JsonProperty("premium_subscriber", NullValueHandling = NullValueHandling.Ignore)]
        public object PremiumSubscriber { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordRoleTags() { }
    }
}
