using System;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions.AspNetCore
{
    /// <summary>A <see href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/request-features?view=aspnetcore-5.0">Request Feature</see> that serves purpose of caching the read
    /// interaction request body between middleware calls.</summary>
    /// <remarks>The default internal implementation will not parse JSON and Object versions until it's actually requested.</remarks>
    public interface IDiscordInteractionReaderFeature
    {
        /// <summary>Interaction body in raw, string format.</summary>
        string InteractionRaw { get; }
        /// <summary>Interaction body in format parsed by Newtonsoft.JSON.</summary>
        JObject InteractionJson { get; }
        /// <summary>Interaction body as a strongly typed object.</summary>
        DiscordInteraction Interaction { get; }
    }

    namespace Services
    {
        /// <inheritdoc/>
        public class DiscordInteractionReaderFeature : IDiscordInteractionReaderFeature
        {
            /// <inheritdoc/>
            public string InteractionRaw { get; }
            /// <inheritdoc/>
            public JObject InteractionJson => this._jsonInteraction.Value;
            /// <inheritdoc/>
            public DiscordInteraction Interaction => this._typedInteraction.Value;

            private readonly Lazy<JObject> _jsonInteraction;
            private readonly Lazy<DiscordInteraction> _typedInteraction;

            /// <summary>Creates a new reader feature instance from raw request body.</summary>
            /// <param name="requestBody"></param>
            public DiscordInteractionReaderFeature(string requestBody)
            {
                if (string.IsNullOrWhiteSpace(requestBody))
                    throw new ArgumentNullException(nameof(requestBody));

                this.InteractionRaw = requestBody;
                this._jsonInteraction = new Lazy<JObject>(() => JObject.Parse(this.InteractionRaw));
                this._typedInteraction = new Lazy<DiscordInteraction>(() => this._jsonInteraction.Value.ToObject<DiscordInteraction>());
            }
        }
    }
}
