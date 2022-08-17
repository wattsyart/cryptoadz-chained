using System;
using System.Collections.Generic;
using System.Linq;

namespace TehGM.Discord.Interactions
{
    /// <summary>A builder that helps with creating a new <see cref="DiscordApplicationCommand"/> instance.</summary>
    public class DiscordApplicationCommandBuilder
    {
        /// <summary>The name of the command.</summary>
        public string Name { get; set; }
        /// <summary>The description of the command.</summary>
        public string Description { get; set; }
        /// <summary>Type of the command.</summary>
        public DiscordApplicationCommandType Type { get; set; }
        /// <summary>Whether the command is enabled by default when the app is added to a guild.</summary>
        public bool EnabledByDefault { get; set; }
        /// <summary>The collection of user-provided options.</summary>
        public ICollection<DiscordApplicationCommandOption> Options { get; set; }

        /// <summary>Creates a builder for a copy of an existing Discord Application Command.</summary>
        /// <param name="existingCommand"></param>
        public DiscordApplicationCommandBuilder(DiscordApplicationCommand existingCommand)
        {
            DiscordApplicationCommand clone = (DiscordApplicationCommand)existingCommand.Clone();
            this.Name = clone.Name;
            this.Description = clone.Description;
            this.Type = clone.Type;
            this.EnabledByDefault = clone.EnabledByDefault ?? true;
            this.Options = clone.Options;
        }

        /// <summary>Creates a builder for a new Discord Application Command.</summary>
        /// <remarks>The <see cref="EnabledByDefault"/> property will be set to true.</remarks>
        /// <param name="type">Type of the command.</param>
        /// <param name="name">Name of the command.</param>
        /// <param name="description">Description of the command.</param>
        public DiscordApplicationCommandBuilder(DiscordApplicationCommandType type, string name, string description)
        {
            this.Type = type;
            this.Name = name;
            this.Description = description;
            this.EnabledByDefault = true;
        }

        private DiscordApplicationCommandBuilder Modify(Action<DiscordApplicationCommandBuilder> builder)
        {
            builder.Invoke(this);
            return this;
        }

        /// <summary>Creates a builder for a new Slash Command.</summary>
        /// <remarks>The <see cref="EnabledByDefault"/> property will be set to true.</remarks>
        /// <param name="name">Name of the command.</param>
        /// <param name="description">Description of the command.</param>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#slash-commands"/>
        public static DiscordApplicationCommandBuilder CreateSlashCommand(string name, string description)
            => new DiscordApplicationCommandBuilder(DiscordApplicationCommandType.ChatInput, name, description);
        /// <summary>Creates a builder for a new User Command.</summary>
        /// <remarks>The <see cref="EnabledByDefault"/> property will be set to true.</remarks>
        /// <param name="name">Name of the command.</param>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#user-commands"/>
        public static DiscordApplicationCommandBuilder CreateUserCommand(string name)
            => new DiscordApplicationCommandBuilder(DiscordApplicationCommandType.User, name, null);
        /// <summary>Creates a builder for a new Message Command.</summary>
        /// <remarks>The <see cref="EnabledByDefault"/> property will be set to true.</remarks>
        /// <param name="name">Name of the command.</param>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#message-commands"/>
        public static DiscordApplicationCommandBuilder CreateMessageCommand(string name)
            => new DiscordApplicationCommandBuilder(DiscordApplicationCommandType.Message, name, null);

        /// <summary>Sets name of the command.</summary>
        /// <param name="name">Command name.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandBuilder WithName(string name)
            => this.Modify(cmd => cmd.Name = name);
        /// <summary>Sets description of the command.</summary>
        /// <param name="description">Command description.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandBuilder WithDescription(string description)
            => this.Modify(cmd => cmd.Description = description);
        /// <summary>Sets whether the command should be enabled in guild by default.</summary>
        /// <param name="enableByDefault">Default enabled value.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandBuilder WithDefaultEnabledState(bool enableByDefault)
            => this.Modify(cmd => cmd.EnabledByDefault = enableByDefault);
        /// <summary>Changes the command type.</summary>
        /// <param name="type">Type of the command.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandBuilder WithType(DiscordApplicationCommandType type)
            => this.Modify(cmd => cmd.Type = type);

        /// <summary>Adds a new option.</summary>
        /// <param name="option">The option to add.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandBuilder AddOption(DiscordApplicationCommandOption option)
        {
            if (this.Options == null)
                this.Options = new List<DiscordApplicationCommandOption>();
            this.Options.Add(option);
            return this;
        }
        /// <summary>Adds a new option.</summary>
        /// <param name="configure">Delegate allowing configuration of the new option.</param>
        /// <returns>Current builder.</returns>
        public DiscordApplicationCommandBuilder AddOption(Action<DiscordApplicationCommandOptionBuilder> configure)
        {
            DiscordApplicationCommandOptionBuilder builder = new DiscordApplicationCommandOptionBuilder();
            configure.Invoke(builder);
            return this.AddOption(builder.Build());
        }

        /// <summary>Builds the command.</summary>
        /// <returns>A new instance of a Discord Application Command.</returns>
        public DiscordApplicationCommand Build()
        {
            DiscordApplicationCommand result = new DiscordApplicationCommand(this.Type, this.Name, this.Description, this.EnabledByDefault);
            if (this.Options?.Any() == true)
                result.Options = this.Options;
            return result;
        }
    }
}
