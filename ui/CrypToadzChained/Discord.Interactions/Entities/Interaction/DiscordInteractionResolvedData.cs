using System.Collections.Generic;
using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents resolved data of entities related to a Discord Interaction.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data-structure"/>
    public class DiscordInteractionResolvedData
    {
#pragma warning disable CS0649 // unassigned warning
        [JsonProperty("users", NullValueHandling = NullValueHandling.Ignore)]
        private Dictionary<ulong, DiscordUser> _users;
        [JsonProperty("members", NullValueHandling = NullValueHandling.Ignore)]
        private Dictionary<ulong, DiscordGuildMember> _members;
        [JsonProperty("messages", NullValueHandling = NullValueHandling.Ignore)]
        private Dictionary<ulong, DiscordMessage> _messages;
        [JsonProperty("roles", NullValueHandling = NullValueHandling.Ignore)]
        private Dictionary<ulong, DiscordRole> _roles;
        [JsonProperty("channels", NullValueHandling = NullValueHandling.Ignore)]
        private Dictionary<ulong, DiscordChannel> _channels;
#pragma warning restore CS0649

        /// <summary>the ids and User objects</summary>
        [JsonIgnore]
        public IReadOnlyDictionary<ulong, DiscordUser> Users => this._users;
        /// <summary>the ids and partial Member objects</summary>
        [JsonIgnore]
        public IReadOnlyDictionary<ulong, DiscordGuildMember> GuildMembers => this._members;
        /// <summary>the ids and partial Message objects</summary>
        [JsonIgnore]
        public IReadOnlyDictionary<ulong, DiscordMessage> Messages => this._messages;
        /// <summary>the ids and Role objects</summary>
        [JsonIgnore]
        public IReadOnlyDictionary<ulong, DiscordRole> Roles => this._roles;
        /// <summary>the ids and partial Channel objects</summary>
        [JsonIgnore]
        public IReadOnlyDictionary<ulong, DiscordChannel> Channels => this._channels;

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordInteractionResolvedData() { }
    }
}
