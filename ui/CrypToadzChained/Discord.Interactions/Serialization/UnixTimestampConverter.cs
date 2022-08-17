using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TehGM.Discord.Serialization
{
    /// <summary>A JSON converter for converting between DateTime and Unix timestamp (in seconds).</summary>
    /// <remarks>This class also contains non-JSON static converting methods.</remarks>
    public class UnixTimestampConverter : DateTimeConverterBase
    {
        public static readonly DateTime _epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        public static readonly DateTimeOffset _epochOffset = new DateTimeOffset(_epoch);

        /// <summary>Converts provided date and time value to unix timestamp (in seconds).</summary>
        /// <param name="value">The value to convert to unix timestamp.</param>
        /// <returns>Unix timestamp (in seconds).</returns>
        public static long ToUnixTimestamp(DateTime value)
        {
            double seconds = ((DateTime)value - _epoch).TotalSeconds;
            return (long)seconds;
        }

        /// <summary>Converts provided date and time value to unix timestamp (in seconds).</summary>
        /// <param name="value">The value to convert to unix timestamp.</param>
        /// <returns>Unix timestamp (in seconds).</returns>
        public static long ToUnixTimestamp(DateTimeOffset value)
            => ToUnixTimestamp(value.UtcDateTime);

        /// <summary>Converts provided unix timestamp (in seconds) to a date and time value.</summary>
        /// <param name="value">Unix timestamp (in seconds).</param>
        /// <returns>Date and time value.</returns>
        public static DateTime ToDateTime(long value)
            => _epoch.AddSeconds(value);

        /// <summary>Converts provided unix timestamp (in seconds) to a date and time value.</summary>
        /// <param name="value">Unix timestamp (in seconds).</param>
        /// <returns>Date and time value.</returns>
        public static DateTimeOffset ToDateTimeOffset(long value)
            => _epochOffset.AddSeconds(value);

        /// <inheritdoc/>
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
                writer.WriteNull();
            else if (value is DateTime dt)
                writer.WriteValue(ToUnixTimestamp(dt));
            else if (value is DateTimeOffset dto)
                writer.WriteValue(ToUnixTimestamp(dto));
        }

        /// <inheritdoc/>
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.Value == null)
                return null;
            if (objectType == typeof(DateTimeOffset) || objectType == typeof(DateTimeOffset?))
                return ToDateTimeOffset((long)reader.Value);
            return ToDateTime((long)reader.Value);
        }
    }
}
