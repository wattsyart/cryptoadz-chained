using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents a Discord Application Command.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/application-commands"/>
    public class DiscordApplicationCommand : ICloneable
    {
        /// <summary>Max length of commands's <see cref="Name"/>.</summary>
        public const int MaxNameLength = 32;
        /// <summary>Max length of commands's <see cref="Description"/>.</summary>
        public const int MaxDescriptionLength = 100;

        [JsonProperty("name", Required = Required.Always)]
        private string _name;
        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        private string _description;

        // settable
        /// <summary>Type of the command.</summary>
        [JsonProperty("type")]
        public DiscordApplicationCommandType Type { get; set; } = DiscordApplicationCommandType.ChatInput;
        /// <summary>Whether the command is enabled by default when the app is added to a guild.</summary>
        [JsonProperty("default_permission", NullValueHandling = NullValueHandling.Ignore)]
        public bool? EnabledByDefault { get; set; } = true;
        /// <summary>The name of the command.</summary>
        /// <exception cref="ArgumentException">The value is empty or longer than <see cref="MaxNameLength"/>.</exception>
        [JsonIgnore]
        public string Name
        {
            get => this._name;
            set
            {
                if (string.IsNullOrWhiteSpace(value) || value.Length > MaxNameLength)
                    throw new ArgumentException($"Discord Application Command's {nameof(this.Name)} must be between 1 and {MaxNameLength} characters long.");
                this._name = value;
            }
        }
        /// <summary>The description of the command.</summary>
        /// <remarks>This value should be null, unless command's <see cref="Type"/> is <see cref="DiscordApplicationCommandType.ChatInput"/>.</remarks>
        /// <exception cref="ArgumentException">The value is of invalid length and the command's <see cref="Type"/> is <see cref="DiscordApplicationCommandType.ChatInput"/>.</exception>
        /// <exception cref="InvalidOperationException">The command's <see cref="Type"/> is different than <see cref="DiscordApplicationCommandType.ChatInput"/>.</exception>
        [JsonIgnore]
        public string Description
        {
            get => this._description;
            set
            {
                if (this.Type == DiscordApplicationCommandType.ChatInput)
                {
                    if (string.IsNullOrWhiteSpace(value) || value.Length > MaxDescriptionLength)
                        throw new ArgumentException($"Discord Application Command's {nameof(this.Description)} must be between 1 and {MaxDescriptionLength} characters long.");
                }
                else if (!string.IsNullOrEmpty(value))
                    throw new InvalidOperationException($"Discord Application Commands of type {this.Type} cannot have a description.");
                this._description = value;
            }
        }
        /// <summary>The collection of user-provided options.</summary>
        [JsonProperty("options", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public ICollection<DiscordApplicationCommandOption> Options { get; set; }

        // readonly
        /// <summary>ID of the guild this command is added to.</summary>
        [JsonProperty("guild_id", NullValueHandling = NullValueHandling.Ignore)]
        public ulong? GuildID { get; private set; }
        /// <summary>ID of this command.</summary>
        [JsonProperty("id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public ulong ID { get; private set; }
        /// <summary>ID of the parent application.</summary>
        [JsonProperty("application_id", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public ulong ApplicationID { get; private set; }
        /// <summary>Version of the command. Automatically incremented by Discord's servers when the command is updated.</summary>
        [JsonProperty("version", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public ulong Version { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordApplicationCommand() { }

        /// <summary>Creates a new Discord Application Command.</summary>
        /// <param name="type">Type of the command.</param>
        /// <param name="name">Name of the command.</param>
        /// <param name="description">Description of the command.</param>
        /// <param name="enabledByDefault">Whether the command is enabled by default when the app is added to a guild.</param>
        /// <exception cref="ArgumentException"><paramref name="name"/> is of invalid length, 
        /// or <paramref name="description"/> is of invalid length and the command's <see cref="Type"/> is <see cref="DiscordApplicationCommandType.ChatInput"/>.</exception>
        /// <exception cref="InvalidOperationException"><paramref name="description"/> is not empte and the command's <see cref="Type"/> is different than <see cref="DiscordApplicationCommandType.ChatInput"/>.</exception>
        public DiscordApplicationCommand(DiscordApplicationCommandType type, string name, string description, bool enabledByDefault) : this()
        {
            this.Type = type;
            this.Name = name;
            this.Description = description;
            this.EnabledByDefault = enabledByDefault;
        }

        /// <summary>Creates a new slash command./summary>
        /// <param name="name">Name of the command.</param>
        /// <param name="description">Description of the command.</param>
        /// <param name="enabledByDefault">Whether the command is enabled by default when the app is added to a guild.</param>
        /// <returns>A new Discord Application Command instance.</returns>
        /// <exception cref="ArgumentException"><paramref name="name"/> or <paramref name="description"/> is of invalid length.</exception>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#slash-commands"/>
        public static DiscordApplicationCommand SlashCommand(string name, string description, bool enabledByDefault = true)
            => new DiscordApplicationCommand(DiscordApplicationCommandType.ChatInput, name, description, enabledByDefault);
        /// <summary>Creates a new user (UI) command./summary>
        /// <param name="name">Name of the command.</param>
        /// <param name="enabledByDefault">Whether the command is enabled by default when the app is added to a guild.</param>
        /// <returns>A new Discord Application Command instance.</returns>
        /// <exception cref="ArgumentException"><paramref name="name"/> is of invalid length.</exception>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#user-commands"/>
        public static DiscordApplicationCommand UserCommand(string name, bool enabledByDefault = true)
            => new DiscordApplicationCommand(DiscordApplicationCommandType.User, name, null, enabledByDefault);
        /// <summary>Creates a new message (UI) command./summary>
        /// <param name="name">Name of the command.</param>
        /// <param name="enabledByDefault">Whether the command is enabled by default when the app is added to a guild.</param>
        /// <returns>A new Discord Application Command instance.</returns>
        /// <exception cref="ArgumentException"><paramref name="name"/> is of invalid length.</exception>
        /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#message-commands"/>
        public static DiscordApplicationCommand MessageCommand(string name, bool enabledByDefault = true)
            => new DiscordApplicationCommand(DiscordApplicationCommandType.Message, name, null, enabledByDefault);

        /// <inheritdoc/>
        public object Clone()
        {
            DiscordApplicationCommand result = (DiscordApplicationCommand)this.MemberwiseClone();
            if (this.Options != null)
                result.Options = new List<DiscordApplicationCommandOption>(this.Options.Select(o => (DiscordApplicationCommandOption)o.Clone()));
            return result;
        }
    }
}
