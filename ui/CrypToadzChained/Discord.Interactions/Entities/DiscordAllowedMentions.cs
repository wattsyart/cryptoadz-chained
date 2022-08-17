using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using TehGM.Discord.Serialization;

namespace TehGM.Discord
{
    /// <summary>Discord allowed mentions object.</summary>
    /// <remarks>Do NOT serialize manually. Use <see cref="DiscordAllowedMentionsConverter"/>, which will handle any invalid state of the object.</remarks>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#allowed-mentions-object"/>
    [JsonConverter(typeof(DiscordAllowedMentionsConverter))]
    public class DiscordAllowedMentions
    {
        /// <summary>Allow all mentions.</summary>
        public static DiscordAllowedMentions All { get; } = new DiscordAllowedMentions() { AllRoles = true, AllUsers = true, Everyone = true, Reply = true };
        /// <summary>Allow mentions of the user the message is responding to.</summary>
        public static DiscordAllowedMentions RepliedUser { get; } = new DiscordAllowedMentions() { Reply = true };
        /// <summary>Allow mentions of specific user IDs.</summary>
        /// <param name="userIDs">User IDs that can be mentioned.</param>
        /// <returns></returns>
        public static DiscordAllowedMentions Users(IEnumerable<ulong> userIDs) => BuildNew(result => result.AddUserIDs(userIDs));
        /// <summary>Allow mentions of specific user IDs.</summary>
        /// <param name="userIDs">User IDs that can be mentioned.</param>
        /// <returns></returns>
        public static DiscordAllowedMentions Users(params ulong[] userIDs) => Users(userIDs as IEnumerable<ulong>);
        /// <summary>Allow mentions of specific role IDs.</summary>
        /// <param name="roleIDs">Role IDs that can be mentioned.</param>
        /// <returns></returns>
        public static DiscordAllowedMentions Roles(IEnumerable<ulong> roleIDs) => BuildNew(result => result.AddRoleIDs(roleIDs));
        /// <summary>Allow mentions of specific role IDs.</summary>
        /// <param name="roleIDs">Role IDs that can be mentioned.</param>
        /// <returns></returns>
        public static DiscordAllowedMentions Roles(params ulong[] roleIDs) => Roles(roleIDs as IEnumerable<ulong>);

        [JsonProperty(DiscordAllowedMentionsConverter.ParsePropertyName, NullValueHandling = NullValueHandling.Ignore, DefaultValueHandling = DefaultValueHandling.Ignore)]
        private readonly HashSet<string> _parse;
        /// <summary>IDs of users that can be mentioned.</summary>
        [JsonProperty(DiscordAllowedMentionsConverter.UsersPropertyName, NullValueHandling = NullValueHandling.Ignore, DefaultValueHandling = DefaultValueHandling.Ignore)]
        public IReadOnlyCollection<ulong> UserIDs { get; private set; }
        /// <summary>IDs of users that can be mentioned.</summary>
        [JsonProperty(DiscordAllowedMentionsConverter.RolesPropertyName, NullValueHandling = NullValueHandling.Ignore, DefaultValueHandling = DefaultValueHandling.Ignore)]
        public IReadOnlyCollection<ulong> RoleIDs { get; private set; }

        /// <summary>Allow mentions of all users.</summary>
        [JsonIgnore]
        public bool AllUsers
        {
            get => this._parse.Contains(ParseValues.Users);
            set
            {
                if (value)
                    this._parse.Add(ParseValues.Users);
                else
                    this._parse.Remove(ParseValues.Users);
            }
        }
        /// <summary>Allow mentions of all reoles.</summary>
        [JsonIgnore]
        public bool AllRoles
        {
            get => this._parse.Contains(ParseValues.Roles);
            set
            {
                if (value)
                    this._parse.Add(ParseValues.Roles);
                else
                    this._parse.Remove(ParseValues.Roles);
            }
        }
        /// <summary>Allow @everyone mentions.</summary>
        [JsonIgnore]
        public bool Everyone
        {
            get => this._parse.Contains(ParseValues.Everyone);
            set
            {
                if (value)
                    this._parse.Add(ParseValues.Everyone);
                else
                    this._parse.Remove(ParseValues.Everyone);
            }
        }

        /// <summary>Allow mentions of the user the message is responding to.</summary>
        [JsonProperty(DiscordAllowedMentionsConverter.ReplyPropertyName)]
        public bool Reply { get; set; }

        /// <summary>Creates a new instance of Discord allowed mentions.</summary>
        public DiscordAllowedMentions()
        {
            this._parse = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        }

        /// <summary>Add user IDs to set of allowed user IDs.</summary>
        /// <param name="ids">User IDs.</param>
        public void AddUserIDs(params ulong[] ids)
            => AddUserIDs(ids as IEnumerable<ulong>);
        /// <summary>Add user IDs to set of allowed user IDs.</summary>
        /// <param name="ids">User IDs.</param>
        public void AddUserIDs(IEnumerable<ulong> ids)
        {
            if (ids?.Any() != true)
                return;
            if (this.UserIDs == null)
                this.UserIDs = new List<ulong>();
            (this.UserIDs as List<ulong>).AddRange(ids);
        }

        /// <summary>Add role IDs to set of allowed role IDs.</summary>
        /// <param name="ids">Role IDs.</param>
        public void AddRoleIDs(params ulong[] ids)
            => AddRoleIDs(ids as IEnumerable<ulong>);
        /// <summary>Add role IDs to set of allowed role IDs.</summary>
        /// <param name="ids">Role IDs.</param>
        public void AddRoleIDs(IEnumerable<ulong> ids)
        {
            if (ids?.Any() != true)
                return;
            if (this.RoleIDs == null)
                this.RoleIDs = new List<ulong>();
            (this.RoleIDs as List<ulong>).AddRange(ids);
        }

        // COMBINING HELPERS
        private static DiscordAllowedMentions BuildNew(Action<DiscordAllowedMentions> operation)
        {
            DiscordAllowedMentions result = new DiscordAllowedMentions();
            operation.Invoke(result);
            return result;
        }

        /// <summary>Combines allowed mentions objects, producing new allowed mentions objects that allows all mentions from the provided objects.</summary>
        /// <param name="obj1">Allowed mentions object to combine.</param>
        /// <param name="obj2">Allowed mentions object to combine.</param>
        /// <returns>A new allowed mentions set that includes all allowed mentions from the provided objects.</returns>
        public static DiscordAllowedMentions operator +(DiscordAllowedMentions obj1, DiscordAllowedMentions obj2)
            => Combine(obj1, obj2);

        /// <summary>Combines allowed mentions objects, producing new allowed mentions objects that allows all mentions from the provided objects.</summary>
        /// <param name="allowedMentions">Allowed mentions objects to combine.</param>
        /// <returns>A new allowed mentions set that includes all allowed mentions from the provided objects.</returns>
        public static DiscordAllowedMentions Combine(params DiscordAllowedMentions[] allowedMentions)
            => BuildNew(result =>
            {
                result.Everyone = allowedMentions.Any(input => input.Everyone);
                result.AllRoles = allowedMentions.Any(input => input.AllRoles);
                result.AllUsers = allowedMentions.Any(input => input.AllUsers);
                result.Reply = allowedMentions.Any(input => input.Reply);
                result.AddUserIDs(allowedMentions.SelectMany(input => input.UserIDs));
                result.AddRoleIDs(allowedMentions.SelectMany(input => input.RoleIDs));
            });


        internal static class ParseValues
        {
            public const string Everyone = "everyone";
            public const string Users = "users";
            public const string Roles = "roles";
        }
    }
}
