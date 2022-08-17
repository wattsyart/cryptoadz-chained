using System;
using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents a selectable choice for a <see cref="DiscordApplicationCommandOption"/>.</summary>
    public class DiscordApplicationCommandOptionChoice : ICloneable
    {
        /// <summary>Max length of choice's <see cref="Name"/>.</summary>
        public const int MaxNameLength = 100;
        /// <summary>Max length of choice's <see cref="Value"/>.</summary>
        public const int MaxValueLength = 100;

        [JsonProperty("name", Required = Required.Always)]
        private string _name;
        [JsonProperty("value", Required = Required.Always)]
        private object _value;

        /// <summary>The name of the choice.</summary>
        /// <exception cref="ArgumentException">The value is empty or longer than <see cref="MaxNameLength"/>.</exception>
        [JsonIgnore]
        public string Name
        {
            get => this._name;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || value.Length > MaxNameLength)
                    throw new ArgumentException($"Discord Application Command Option Choice's {nameof(this.Name)} must be between 1 and {MaxNameLength} characters long.");
                this._name = value;
            }
        }
        /// <summary>The value of the choice.</summary>
        /// <exception cref="ArgumentException">The value is longer than <see cref="MaxValueLength"/>.</exception>
        [JsonIgnore]
        public object Value
        {
            get => this._value;
            private set
            {
                if (value is string s && s.Length > MaxValueLength)
                    throw new ArgumentException($"Discord Application Command Option Choice's {nameof(this.Value)} cannot be longer than {MaxValueLength} characters.");
                this._value = value;
            }
        }

        /// <summary>Sets an integer value of the choice.</summary>
        /// <param name="integerValue">The choice's value.</param>
        public void SetValue(int integerValue)
            => this.Value = integerValue;
        /// <summary>Sets a number value of the choice.</summary>
        /// <param name="numberValue">The choice's value.</param>
        public void SetValue(double numberValue)
            => this.Value = numberValue;
        /// <summary>Sets a string value of the choice.</summary>
        /// <param name="stringValue">The choice's value.</param>
        /// <exception cref="ArgumentException">The value is empty or longer than <see cref="MaxValueLength"/>.</exception>
        public void SetValue(string stringValue)
            => this.Value = stringValue;

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordApplicationCommandOptionChoice() { }

        private DiscordApplicationCommandOptionChoice(string name, object value)
        {
            this.Name = name;
            this.Value = value;
        }

        /// <summary>Creates a new integer option choice.</summary>
        /// <param name="name">Name of the choice.</param>
        /// <param name="value">Value of the choice.</param>
        /// <returns>A new option choice instance.</returns>
        /// <exception cref="ArgumentException"><paramref name="name"/> is of invalid length.</exception>
        public static DiscordApplicationCommandOptionChoice IntegerChoice(string name, int value)
            => new DiscordApplicationCommandOptionChoice(name, value);
        /// <summary>Creates a new number option choice.</summary>
        /// <param name="name">Name of the choice.</param>
        /// <param name="value">Value of the choice.</param>
        /// <returns>A new option choice instance.</returns>
        /// <exception cref="ArgumentException"><paramref name="name"/> is of invalid length.</exception>
        public static DiscordApplicationCommandOptionChoice NumberChoice(string name, double value)
            => new DiscordApplicationCommandOptionChoice(name, value);
        /// <summary>Creates a new string option choice.</summary>
        /// <param name="name">Name of the choice.</param>
        /// <param name="value">Value of the choice.</param>
        /// <returns>A new option choice instance.</returns>
        /// <exception cref="ArgumentException"><paramref name="name"/> or <paramref name="value"/> is of invalid length.</exception>
        public static DiscordApplicationCommandOptionChoice StringChoice(string name, string value)
            => new DiscordApplicationCommandOptionChoice(name, value);

        /// <inheritdoc/>
        public object Clone()
        {
            DiscordApplicationCommandOptionChoice result = (DiscordApplicationCommandOptionChoice)this.MemberwiseClone();
            return result;
        }
    }
}
