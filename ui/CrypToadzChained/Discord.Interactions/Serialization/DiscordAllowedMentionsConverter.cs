using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Serialization
{
    /// <summary>A special converter for <see cref="DiscordAllowedMentions"/> object that ensures the object is serialized in a way that is accepted by Discord servers.</summary>
    /// <remarks>According to <see href="https://discord.com/developers/docs/resources/channel#allowed-mentions-object">Discord Documentation</see>, Discord server is pretty restrictive
    /// when it comes to valid formats of allowed mentions objects. This converter is designed to ensure that the object is serialized properly, while still allowing <see cref="DiscordAllowedMentions"/>
    /// to be quite flexible to use within C# realm.</remarks>
    public class DiscordAllowedMentionsConverter : JsonConverter
    {
        internal const string UsersPropertyName = "users";
        internal const string RolesPropertyName = "roles";
        internal const string ParsePropertyName = "parse";
        internal const string ReplyPropertyName = "replied_user";

        /// <inheritdoc/>
        public override bool CanConvert(Type objectType)
            => typeof(DiscordAllowedMentions).IsAssignableFrom(objectType);

        /// <inheritdoc/>
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            // deserialize as-is - it's serialization that has some complexity
            JToken token = JToken.Load(reader);
            return token.ToObject(objectType, serializer);
        }

        /// <inheritdoc/>
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            JObject result = new JObject();

            // get all json properties at once - this will prevent repetitive reflection lookups
            IEnumerable<JsonPropertyMember> members = this.GetJsonPropertyMembers(value);

            // first get the backing parse collection
            ICollection<string> parse = GetValue<ICollection<string>>(ParsePropertyName);
            if (parse == null)
                return;
            if (parse.Any())
            {
                JArray array = JArray.FromObject(parse);
                result.Add(ParsePropertyName, array);
            }

            // if not allowing all mentions of type, add collections with IDs
            AddIDs(DiscordAllowedMentions.ParseValues.Users, UsersPropertyName);
            AddIDs(DiscordAllowedMentions.ParseValues.Roles, RolesPropertyName);

            // also add reply prop
            result.Add(ReplyPropertyName, GetValue<bool>(ReplyPropertyName));

            // write result
            result.WriteTo(writer);

            T GetValue<T>(string propertyName)
            {
                JsonPropertyMember member = members.FirstOrDefault(m => m.Name.Equals(propertyName, StringComparison.Ordinal));
                if (member == null)
                    return default(T);
                return member.GetValue<T>(value);
            }
            void AddIDs(string parseValue, string propertyName)
            {
                if (parse.Contains(parseValue))
                    return;
                IEnumerable<ulong> ids = GetValue<IEnumerable<ulong>>(propertyName);
                if (!ids.Any())
                    return;
                JArray array = JArray.FromObject(ids);
                result.Add(propertyName, array);
            }
        }

        private IEnumerable<JsonPropertyMember> GetJsonPropertyMembers(object obj)
        {
            Type type = obj.GetType();
            BindingFlags flags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
            List<JsonPropertyMember> results = new List<JsonPropertyMember>();
            LoadMembers(type.GetFields(flags));
            LoadMembers(type.GetProperties(flags));
            return results;

            void LoadMembers(IEnumerable<MemberInfo> members)
            {
                foreach (MemberInfo m in members)
                {
                    JsonPropertyAttribute attr = m.GetCustomAttribute<JsonPropertyAttribute>();
                    if (attr == null)
                        continue;
                    results.Add(new JsonPropertyMember(m, attr));
                }
            }
        }

        private class JsonPropertyMember
        {
            public string Name => this.Attribute.PropertyName;
            public JsonPropertyAttribute Attribute { get; }
            public FieldInfo Field { get; }
            public PropertyInfo Property { get; }

            public JsonPropertyMember(MemberInfo member, JsonPropertyAttribute attribute)
            {
                if (member is FieldInfo field)
                    this.Field = field;
                else if (member is PropertyInfo property)
                    this.Property = property;
                else
                    throw new ArgumentException("Member needs to be a field or a property.", nameof(member));

                if (attribute == null)
                    throw new ArgumentNullException(nameof(attribute));
                this.Attribute = attribute;
            }

            public T GetValue<T>(object obj)
            {
                object value;
                if (this.Field != null)
                    value = this.Field.GetValue(obj);
                else
                    value = this.Property.GetValue(obj);
                if (value is T result)
                    return result;
                return default(T);
            }
        }
    }
}
