using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Represents a Discord guild member.</summary>
    public class DiscordGuildMember
    {
        /// <summary>the user this guild member represents</summary>
        [JsonProperty("user", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordUser User { get; private set; }
        /// <summary>this users guild nickname</summary>
        [JsonProperty("nick", NullValueHandling = NullValueHandling.Ignore)]
        public string Nickname { get; private set; }
        /// <summary>the member's guild avatar hash</summary>
        /// <seealso href="https://discord.com/developers/docs/reference#image-formatting"/>
        [JsonProperty("avatar")]
        public string AvatarHash { get; private set; }
        /// <summary>Array of role IDs.</summary>
        [JsonProperty("roles")]
        public IEnumerable<ulong> RoleIDs { get; private set; }
        /// <summary>when the user joined the guild</summary>
        [JsonProperty("joined_at")]
        public DateTime JoinedTime { get; private set; }
        /// <summary>when the user started boosting the guild</summary>
        [JsonProperty("premium_since", NullValueHandling = NullValueHandling.Ignore)]
        public DateTime? PremiumSince { get; private set; }
        /// <summary>whether the user is deafened in voice channels</summary>
        [JsonProperty("deaf")]
        public bool IsDeafened { get; private set; }
        /// <summary>whether the user is muted in voice channels</summary>
        [JsonProperty("mute")]
        public bool IsMuted { get; private set; }
#pragma warning disable CS0649 // unassigned warning
        [JsonProperty("pending", NullValueHandling = NullValueHandling.Ignore)]
        private bool? _pending;
#pragma warning restore CS0649
        /// <summary>whether the user has not yet passed the guild's Membership Screening requirements</summary>
        /// <seealso href="https://discord.com/developers/docs/resources/guild#membership-screening-object"/>
        [JsonIgnore]
        public bool IsPending => this._pending == true;
        /// <summary>total permissions of the member in the channel, including overwrites, returned when in the interaction object</summary>
        [JsonProperty("permissions", NullValueHandling = NullValueHandling.Ignore)]
        public string Permissions { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordGuildMember() { }
    }
}
