using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents an option for a Discord Application Command that is settable by a Discord user when invoking the command.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure"/>
    public class DiscordApplicationCommandOption : ICloneable
    {
        /// <summary>Max length of option's <see cref="Name"/>.</summary>
        public const int MaxNameLength = 32;
        /// <summary>Max length of option's <see cref="Description"/>.</summary>
        public const int MaxDescriptionLength = 100;

        [JsonProperty("name", Required = Required.Always)]
        private string _name;
        [JsonProperty("description", Required = Required.Always)]
        private string _description;

        /// <summary>The name of the option.</summary>
        /// <exception cref="ArgumentException">The value is empty or longer than <see cref="MaxNameLength"/>.</exception>
        [JsonIgnore]
        public string Name
        {
            get => this._name;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || value.Length > MaxNameLength)
                    throw new ArgumentException($"Discord Application Command Option's {nameof(this.Name)} must be between 1 and {MaxNameLength} characters long.");
                this._name = value;
            }
        }
        /// <summary>The description of the option.</summary>
        /// <exception cref="ArgumentException">The value is empty or longer than <see cref="MaxDescriptionLength"/>.</exception>
        [JsonIgnore]
        public string Description
        {
            get => this._description;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || value.Length > MaxDescriptionLength)
                    throw new ArgumentException($"Discord Application Command Option's {nameof(this.Description)} must be between 1 and {MaxDescriptionLength} characters long.");
                this._description = value;
            }
        }
        /// <summary>Type of the option.</summary>
        [JsonProperty("type")]
        public DiscordApplicationCommandOptionType Type { get; set; }
        /// <summary>Whether the user is required to set value of this option.</summary>
        [JsonProperty("required", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsRequired { get; set; }
        /// <summary>Sub-options. Only valid for options of type <see cref="DiscordApplicationCommandOptionType.SubCommand"/> and <see cref="DiscordApplicationCommandOptionType.SubCommandGroup"/>.</summary>
        [JsonProperty("options", NullValueHandling = NullValueHandling.Ignore)]
        public ICollection<DiscordApplicationCommandOption> NestedOptions { get; set; }
        /// <summary>Choices the user can pick for this option. Only valid for options of type <see cref="DiscordApplicationCommandOptionType.String"/>, 
        /// <see cref="DiscordApplicationCommandOptionType.Integer"/> and <see cref="DiscordApplicationCommandOptionType.Number"/></summary>
        [JsonProperty("choices", NullValueHandling = NullValueHandling.Ignore)]
        public ICollection<DiscordApplicationCommandOptionChoice> Choices { get; set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordApplicationCommandOption() { }

        /// <summary>Creates a new Discord Application Command Option.</summary>
        /// <param name="type">Type of the option.</param>
        /// <param name="name">Name of the option.</param>
        /// <param name="description">Description of the option.</param>
        /// <exception cref="ArgumentException"><paramref name="name"/> or <paramref name="description"/> is of invalid length.</exception>
        public DiscordApplicationCommandOption(DiscordApplicationCommandOptionType type, string name, string description)
        {
            this.Type = type;
            this.Name = name;
            this.Description = description;
        }

        /// <inheritdoc/>
        public object Clone()
        {
            DiscordApplicationCommandOption result = (DiscordApplicationCommandOption)this.MemberwiseClone();
            if (this.NestedOptions != null)
                result.NestedOptions = new List<DiscordApplicationCommandOption>(this.NestedOptions.Select(no => (DiscordApplicationCommandOption)no.Clone()));
            if (this.Choices != null)
                result.Choices = new List<DiscordApplicationCommandOptionChoice>(this.Choices.Select(c => (DiscordApplicationCommandOptionChoice)c.Clone()));
            return result;
        }
    }

    /// <summary>Type of a command/interaction option.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type"/>
    public enum DiscordApplicationCommandOptionType
    {
        /// <summary>The options is actually a command's sub-command.</summary>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups"/>
        SubCommand = 1,
        /// <summary>The options is actually a command's group of sub-command.</summary>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups"/>
        SubCommandGroup = 2,
        /// <summary>A string option.</summary>
        String = 3,
        /// <summary>A Int32 option.</summary>
        Integer = 4,
        /// <summary>A true/false option.</summary>
        Boolean = 5,
        /// <summary>A user mention option.</summary>
        User = 6,
        /// <summary>A channel mention option.</summary>
        Channel = 7,
        /// <summary>A role mention option.</summary>
        Role = 8,
        /// <summary>Users and roles.</summary>
        Mentionable = 9,
        /// <summary>Double, Int32 range.</summary>
        Number = 10
    }
}
