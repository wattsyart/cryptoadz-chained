using System;

namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Marks the class as an interaction command.</summary>
    /// <remarks>Note that the class still needs to implement <see cref="IDiscordInteractionCommandHandler"/> to work.</remarks>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class InteractionCommandAttribute : Attribute
    {
        /// <summary>Type of the command.</summary>
        public DiscordApplicationCommandType CommandType { get; }
        /// <summary>Name of the command.</summary>
        public string Name { get; }
        /// <summary>Description of the command.</summary>
        public string Description { get; }

        /// <summary>Marks the class as an interaction command.</summary>
        /// <param name="type">Type of the command.</param>
        /// <param name="name">Name of the command.</param>
        /// <param name="description">Description of the command.</param>
        public InteractionCommandAttribute(DiscordApplicationCommandType type, string name, string description)
        {
            // validate name
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentNullException(nameof(name));
            if (name.Length > DiscordApplicationCommand.MaxNameLength)
                throw new ArgumentException($"Discord Application Command's {nameof(DiscordApplicationCommand.Name)} must be between 1 and {DiscordApplicationCommand.MaxNameLength} characters long.");

            // validate description
            if (type == DiscordApplicationCommandType.ChatInput)
            {
                if (string.IsNullOrWhiteSpace(description) || description.Length > DiscordApplicationCommand.MaxDescriptionLength)
                    throw new ArgumentException($"Discord Application Command's {nameof(DiscordApplicationCommand.Description)} must be between 1 and {DiscordApplicationCommand.MaxDescriptionLength} characters long.");
            }
            else if (!string.IsNullOrEmpty(description))
                throw new InvalidOperationException($"Discord Application Commands of type {type} cannot have a description.");

            this.CommandType = type;
            this.Name = name;
            this.Description = description;
        }

        /// <summary>Marks the class as an interaction slash command.</summary>
        /// <param name="name">Name of the command.</param>
        /// <param name="description">Description of the command.</param>
        public InteractionCommandAttribute(string name, string description)
            : this(DiscordApplicationCommandType.ChatInput, name, description) { }
    }
}
