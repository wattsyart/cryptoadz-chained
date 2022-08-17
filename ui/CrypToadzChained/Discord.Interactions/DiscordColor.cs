using System;
using System.Drawing;
using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Color wrapper to be easily used with Discord API.</summary>
    /// <remarks>Discord's API requires color to be sent as integer value. This structure is designed to simplify
    /// the conversion between Hex string value, .NET <see cref="Color"/> value, and integer value Discord requires.</remarks>
    [JsonConverter(typeof(Serialization.DiscordColorConverter))]
    public struct DiscordColor : IEquatable<DiscordColor>, IEquatable<uint>, IEquatable<Color>
    {
        /// <summary>Represents no color (value of 0). Colors with value of 0 do not count towards role color calculations.</summary>
        public static DiscordColor None { get; } = new DiscordColor(0);

        /// <summary>Integer value of the color.</summary>
        public uint Value { get; }
        /// <summary>Whether it's no color (value of 0). Colors with value of 0 do not count towards role color calculations.</summary>
        public bool IsNone => this.Value == 0;

        /// <summary>Creates a new Discord color from its integer representation.</summary>
        /// <param name="value">Integer value of the color.</param>
        public DiscordColor(uint value)
        {
            this.Value = value;
        }

        /// <summary>Creates a new Discord color from its hex representation.</summary>
        /// <param name="hexValue">Hex value of the color. Any leading "#" will be ignored.</param>
        public DiscordColor(string hexValue)
            : this(Convert.ToUInt32(hexValue.TrimStart('#'), 16)) { }

        /// <summary>Creates a new Discord color from .NET managed Color.</summary>
        /// <param name="colorValue">.NET managed Color value.</param>
        public DiscordColor(Color colorValue)
            : this((uint)colorValue.ToArgb() << 8 >> 8) { }

        /// <summary>Creates a new Discord color from RGB values.</summary>
        /// <param name="red">Byte value for red component.</param>
        /// <param name="green">Byte value for green component.</param>
        /// <param name="blue">Byte value for blue component.</param>
        public DiscordColor(byte red, byte green, byte blue)
            : this(Color.FromArgb(red, green, blue)) { }

        /// <summary>Creates a new Discord color from RGB values.</summary>
        /// <param name="alpha">Byte value for alpha component.</param>
        /// <param name="red">Byte value for red component.</param>
        /// <param name="green">Byte value for green component.</param>
        /// <param name="blue">Byte value for blue component.</param>
        public DiscordColor(byte alpha, byte red, byte green, byte blue)
            : this(Color.FromArgb(alpha, red, green, blue)) { }

        /// <summary>Converts color to hex value without leading "#".</summary>
        /// <returns>String representing the color without leading "#".</returns>
        public string ToHexValue()
            => this.Value.ToString("X2");
        /// <summary>Converts color to hex value with leading "#", usable with HTML.</summary>
        /// <returns>String representing the color with leading "#".</returns>
        public string ToHtmlValue()
            => $"#{this.ToHexValue()}";
        /// <summary>Converts color to .NET Color value.</summary>
        /// <returns>.NET managed Color value.</returns>
        public Color ToColor()
            => Color.FromArgb((int)this.Value);

        /// <summary>Creates a new Discord color from its integer representation.</summary>
        /// <param name="value">Integer value of the color.</param>
        public static implicit operator DiscordColor(uint value)
            => new DiscordColor(value);
        /// <summary>Creates a new Discord color from .NET managed Color.</summary>
        /// <param name="value">.NET managed Color value.</param>
        public static implicit operator DiscordColor(Color value)
            => new DiscordColor(value);

        /// <summary>Converts color to .NET Color value.</summary>
        /// <param name="value">Discord-compatible color.</param>
        public static implicit operator Color(DiscordColor value)
            => value.ToColor();
        /// <summary>Integer value of the color.</summary>
        /// <param name="value">Discord-compatible color.</param>
        public static implicit operator uint(DiscordColor value)
            => value.Value;

        /// <summary>Returns a string representation of this color's Discord-compatible value.</summary>
        /// <returns>A string representation of this color's Discord-compatible value.</returns>
        public override string ToString()
            => this.Value.ToString();

        /// <inheritdoc/>
        public override bool Equals(object obj)
        {
            if (obj is DiscordColor discordColor)
                return this.Equals(discordColor);
            if (obj is uint integer)
                return this.Equals(integer);
            if (obj is Color color)
                return this.Equals(color);
            return false;
        }

        /// <inheritdoc/>
        public bool Equals(DiscordColor other)
            => this.Value == other.Value;

        /// <inheritdoc/>
        public bool Equals(uint other)
            => this.Value == other;

        /// <inheritdoc/>
        public bool Equals(Color other)
            => this.Value == new DiscordColor(other).Value;

        /// <inheritdoc/>
        public override int GetHashCode()
            => this.Value.GetHashCode();
    }
}
