using System;
using System.Collections.Generic;
using System.Linq;

namespace TehGM.Discord.Interactions
{
    /// <summary>A builder that helps with creating a new <see cref="DiscordApplicationCommandOption"/> instance.</summary>
    public class DiscordApplicationCommandOptionBuilder
    {
        /// <summary>The name of the option.</summary>
        public string Name { get; set; }
        /// <summary>The description of the option.</summary>
        public string Description { get; set; }
        /// <summary>Type of the option.</summary>
        public DiscordApplicationCommandOptionType Type { get; set; }
        /// <summary>Whether the user is required to set value of this option.</summary>
        public bool IsRequired { get; set; }
        /// <summary>Sub-options. Only valid for options of type <see cref="DiscordApplicationCommandOptionType.SubCommand"/> and <see cref="DiscordApplicationCommandOptionType.SubCommandGroup"/>.</summary>
        public ICollection<DiscordApplicationCommandOption> NestedOptions { get; set; }
        /// <summary>Choices the user can pick for this option. Only valid for options of type <see cref="DiscordApplicationCommandOptionType.String"/>, 
        /// <see cref="DiscordApplicationCommandOptionType.Integer"/> and <see cref="DiscordApplicationCommandOptionType.Number"/></summary>
        public ICollection<DiscordApplicationCommandOptionChoice> Choices { get; set; }

        /// <summary>Creates a builder for a new command option.</summary>
        public DiscordApplicationCommandOptionBuilder() { }

        private DiscordApplicationCommandOptionBuilder Modify(Action<DiscordApplicationCommandOptionBuilder> builder)
        {
            builder.Invoke(this);
            return this;
        }

        /// <summary>Sets name of the option.</summary>
        /// <param name="name">Option name.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder WithName(string name)
            => this.Modify(opt => opt.Name = name);
        /// <summary>Sets description of the option.</summary>
        /// <param name="description">Option description.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder WithDescription(string description)
            => this.Modify(opt => opt.Description = description);
        /// <summary>Changes the option type.</summary>
        /// <param name="type">Type of the option.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder WithType(DiscordApplicationCommandOptionType type)
            => this.Modify(opt => opt.Type = type);
        /// <summary>Sets whether the user is required to set value of this option.</summary>
        /// <param name="required">Required value</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder WithRequired(bool required)
            => this.Modify(opt => opt.IsRequired = required);

        /// <summary>Adds a nested option.</summary>
        /// <param name="option">The option to add.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder AddNestedOption(DiscordApplicationCommandOption option)
        {
            if (this.NestedOptions == null)
                this.NestedOptions = new List<DiscordApplicationCommandOption>();
            this.NestedOptions.Add(option);
            return this;
        }
        /// <summary>Adds a nested option.</summary>
        /// <param name="configure">Delegate allowing configuration of the new option.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder AddNestedOption(Action<DiscordApplicationCommandOptionBuilder> configure)
        {
            DiscordApplicationCommandOptionBuilder builder = new DiscordApplicationCommandOptionBuilder();
            configure.Invoke(builder);
            return this.AddNestedOption(builder.Build());
        }

        /// <summary>Adds an option choice.</summary>
        /// <param name="choice">The choice to add.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder AddChoice(DiscordApplicationCommandOptionChoice choice)
        {
            if (this.Choices == null)
                this.Choices = new List<DiscordApplicationCommandOptionChoice>();
            this.Choices.Add(choice);
            return this;
        }
        /// <summary>Adds a string option choice.</summary>
        /// <param name="name">Name of the choice.</param>
        /// <param name="value">Value of the choice.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder AddStringChoice(string name, string value)
            => this.AddChoice(DiscordApplicationCommandOptionChoice.StringChoice(name, value));
        /// <summary>Adds an integer option choice.</summary>
        /// <param name="name">Name of the choice.</param>
        /// <param name="value">Value of the choice.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder AddIntegerChoice(string name, int value)
            => this.AddChoice(DiscordApplicationCommandOptionChoice.IntegerChoice(name, value));
        /// <summary>Adds a number option choice.</summary>
        /// <param name="name">Name of the choice.</param>
        /// <param name="value">Value of the choice.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandOptionBuilder AddNumberChoice(string name, double value)
            => this.AddChoice(DiscordApplicationCommandOptionChoice.NumberChoice(name, value));

        /// <summary>Builds the command option.</summary>
        /// <returns>A new instance of a Discord Application Command Choice.</returns>
        public DiscordApplicationCommandOption Build()
        {
            DiscordApplicationCommandOption result = new DiscordApplicationCommandOption(this.Type, this.Name, this.Description);
            result.IsRequired = this.IsRequired;
            if (this.NestedOptions?.Any() == true)
                result.NestedOptions = this.NestedOptions;
            if (this.Choices?.Any() == true)
                result.Choices = this.Choices;
            return result;
        }
    }
}
