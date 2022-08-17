using System;
using Newtonsoft.Json;

namespace TehGM.Discord.Serialization
{
    /// <summary>Manages conversion of <see cref="DiscordColor"/> so it's always serialized as a field, not as a JSON object.</summary>
    public class DiscordColorConverter : JsonConverter<DiscordColor>
    {
        /// <inheritdoc/>
        public override DiscordColor ReadJson(JsonReader reader, Type objectType, DiscordColor existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            uint value = Convert.ToUInt32((long)reader.Value);
            return new DiscordColor(value);
        }

        /// <inheritdoc/>
        public override void WriteJson(JsonWriter writer, DiscordColor value, JsonSerializer serializer)
        {
            writer.WriteValue(value.Value);
        }
    }
}
