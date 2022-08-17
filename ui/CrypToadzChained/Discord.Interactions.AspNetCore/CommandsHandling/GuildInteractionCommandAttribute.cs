using System;
using System.Collections.Generic;

namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Specifies that the command should be registered for specific guilds, instead of globally.</summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class GuildInteractionCommandAttribute : Attribute
    {
        private HashSet<ulong> _guildIDs;
        /// <summary>IDs of the guilds this command is for.</summary>
        public IEnumerable<ulong> GuildIDs => this._guildIDs;

        /// <summary>Sets the guilds this command will be registered for.</summary>
        /// <param name="guildIDs">IDs of the guilds this command is for.</param>
        public GuildInteractionCommandAttribute(params ulong[] guildIDs)
        {
            if (guildIDs.Length == 0)
                throw new ArgumentException("At least one Guild ID is required.", nameof(guildIDs));

            this._guildIDs = new HashSet<ulong>(guildIDs);
        }
    }
}
