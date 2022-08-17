using System.Collections.Generic;
using Newtonsoft.Json;

namespace TehGM.Discord.Interactions
{
    /// <summary>Represents Application command interaction data option.</summary>
    /// <seealso href="https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-interaction-data-option-structure"/>
    public class DiscordInteractionDataOption
    {
        /// <summary>Name of the option.</summary>
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; private set; }

        /// <summary>The value of the pair</summary>
        [JsonProperty("value")]
        public object Value { get; private set; }

        /// <summary>Present if this option is a group or sub-command</summary>
        [JsonProperty("options")]
        public IEnumerable<DiscordInteractionDataOption> Options { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordInteractionDataOption() { }
    }
}
