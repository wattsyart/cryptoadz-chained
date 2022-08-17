using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents data of a Discord Interaction.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data-structure"/>
    public class DiscordInteractionData
    {
        /// <summary>the ID of the invoked command</summary>
        [JsonProperty("id")]
        public ulong ID { get; private set; }
        /// <summary>the name of the invoked command</summary>
        [JsonProperty("name")]
        public string Name { get; private set; }
        /// <summary>the type of the invoked command</summary>
        [JsonProperty("type")]
        public DiscordApplicationCommandType CommandType { get; private set; }
        /// <summary>id the of user or message targetted by a user or message command</summary>
        /// <remarks>Only applicable for User (UI) Command and Message Command.</remarks>
        [JsonProperty("target_id", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? TargetID { get; private set; }

        /// <summary>converted users + roles + channels</summary>
        [JsonProperty("resolved", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordInteractionResolvedData ResolvedData { get; private set; }
        /// <summary>the params + values from the user</summary>
        [JsonProperty("options", NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<DiscordInteractionDataOption> Options { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordInteractionData() { }

        // OPTIONS RETRIEVAL
        private bool TryGetOption<T>(string key, out T value, Func<object, T> parser)
        {
            DiscordInteractionDataOption option = this.Options?.FirstOrDefault(o => o.Name.Equals(key, StringComparison.OrdinalIgnoreCase));
            if (option == null || option.Value == null)
            {
                value = default;
                return false;
            }
            value = parser(option.Value);
            return true;
        }
        /// <summary>Retrieves option provided by user as string if it exists.</summary>
        /// <param name="name">Name of the option to lookup.</param>
        /// <param name="value">The resulting value if option was found.</param>
        /// <returns>True if the option was found; otherwise false.</returns>
        public bool TryGetStringOption(string name, out string value)
            => this.TryGetOption(name, out value, obj => obj.ToString());
        /// <summary>Retrieves option provided by user as int if it exists.</summary>
        /// <param name="name">Name of the option to lookup.</param>
        /// <param name="value">The resulting value if option was found.</param>
        /// <returns>True if the option was found; otherwise false.</returns>
        /// <exception cref="FormatException">Failed converting the value to int.</exception>
        public bool TryGetIntegerOption(string name, out int value)
            => this.TryGetOption(name, out value, obj => int.Parse(obj.ToString()));
        /// <summary>Retrieves option provided by user as double if it exists.</summary>
        /// <param name="name">Name of the option to lookup.</param>
        /// <param name="value">The resulting value if option was found.</param>
        /// <returns>True if the option was found; otherwise false.</returns>
        /// <exception cref="FormatException">Failed converting the value to double.</exception>
        public bool TryGetNumberOption(string name, out double value)
            => this.TryGetOption(name, out value, obj => double.Parse(obj.ToString()));
        /// <summary>Retrieves option provided by user as boolean if it exists.</summary>
        /// <param name="name">Name of the option to lookup.</param>
        /// <param name="value">The resulting value if option was found.</param>
        /// <returns>True if the option was found; otherwise false.</returns>
        /// <exception cref="FormatException">Failed converting the value to boolean.</exception>
        public bool TryGetBooleanOption(string name, out bool value)
            => this.TryGetOption(name, out value, obj => bool.Parse(obj.ToString()));

        // RESOLVED RETRIEVAL
        private bool TryGetResolved<T>(ulong id, out T value, IReadOnlyDictionary<ulong, T> dictionary)
        {
            if (dictionary == null)
            {
                value = default;
                return false;
            }
            return dictionary.TryGetValue(id, out value);
        }
        /// <summary>Retrieves user from resolved data by ID.</summary>
        /// <param name="id">ID of the user.</param>
        /// <param name="user">The resulting user if found.</param>
        /// <returns>True if the user was found; otherwise false.</returns>
        public bool TryGetUser(ulong id, out DiscordUser user)
            => this.TryGetResolved(id, out user, this.ResolvedData?.Users);
        /// <summary>Retrieves guild member from resolved data by ID.</summary>
        /// <param name="id">ID of the guild member.</param>
        /// <param name="guildMember">The resulting guild member if found.</param>
        /// <returns>True if the guild member was found; otherwise false.</returns>
        public bool TryGetGuildMember(ulong id, out DiscordGuildMember guildMember)
            => this.TryGetResolved(id, out guildMember, this.ResolvedData?.GuildMembers);
        /// <summary>Retrieves channel from resolved data by ID.</summary>
        /// <param name="id">ID of the channel.</param>
        /// <param name="channel">The resulting channel if found.</param>
        /// <returns>True if the channel was found; otherwise false.</returns>
        public bool TryGetChannel(ulong id, out DiscordChannel channel)
            => this.TryGetResolved(id, out channel, this.ResolvedData?.Channels);
        /// <summary>Retrieves message from resolved data by ID.</summary>
        /// <param name="id">ID of the message.</param>
        /// <param name="message">The resulting message if found.</param>
        /// <returns>True if the message was found; otherwise false.</returns>
        public bool TryGetMessage(ulong id, out DiscordMessage message)
            => this.TryGetResolved(id, out message, this.ResolvedData?.Messages);
        /// <summary>Retrieves role from resolved data by ID.</summary>
        /// <param name="id">ID of the role.</param>
        /// <param name="role">The resulting role if found.</param>
        /// <returns>True if the role was found; otherwise false.</returns>
        public bool TryGetRole(ulong id, out DiscordRole role)
            => this.TryGetResolved(id, out role, this.ResolvedData?.Roles);
    }
}
