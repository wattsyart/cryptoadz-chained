using System;
using System.Collections.Generic;
using System.Linq;

namespace TehGM.Discord.Interactions
{
    /// <summary>A builder that helps with creating a new <see cref="DiscordInteractionResponse"/> instance.</summary>
    public class DiscordInteractionResponseBuilder
    {
        /// <summary>The type of the response.</summary>
        public DiscordInteractionResponseType Type { get; set; }
        /// <summary>Whether the response is TTS.</summary>
        public bool IsTTS { get; set; }
        /// <summary>The message text content.</summary>
        public string Content { get; set; }
        /// <summary>Up to 10 embeds added to this response.</summary>
        public ICollection<DiscordEmbed> Embeds { get; set; }
        /// <summary>Allowed mentions object specifying which mentions will ping.</summary>
        public DiscordAllowedMentions AllowedMentions { get; set; }
        /// <summary>Interaction response data flags.</summary>
        public DiscordInteractionResponseFlags? Flags { get; set; }

        /// <summary>Creates a builder for a new Discord Interaction Response.</summary>
        /// <remarks><see cref="Type"/> will be set to <see cref="DiscordInteractionResponseType.ChannelMessageWithSource"/> by default.</remarks>
        public DiscordInteractionResponseBuilder()
        {
            this.Type = DiscordInteractionResponseType.ChannelMessageWithSource;
        }

        private DiscordInteractionResponseBuilder Modify(Action<DiscordInteractionResponseBuilder> builder)
        {
            builder.Invoke(this);
            return this;
        }

        /// <summary>Changes the response type.</summary>
        /// <param name="type">Type of the response.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder WithType(DiscordInteractionResponseType type)
            => this.Modify(builder => builder.Type = type);
        /// <summary>Sets whether the response is TTS.</summary>
        /// <param name="tts">TTS value.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder WithTTS(bool tts)
            => this.Modify(builder => builder.IsTTS = tts);
        /// <summary>Sets the text content of the response.</summary>
        /// <param name="text">Response text content.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder WithText(string text)
            => this.Modify(builder => builder.Content = text);
        /// <summary>Sets which mentions will ping.</summary>
        /// <param name="mentions">Allowed mentions object.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder WithAllowedMentions(DiscordAllowedMentions mentions)
            => this.Modify(builder => builder.AllowedMentions = mentions);

        /// <summary>Sets the response flags.</summary>
        /// <param name="flags">Response flags.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder WithFlags(DiscordInteractionResponseFlags? flags)
            => this.Modify(builder => builder.Flags = flags);
        /// <summary>Sets whether the response should be shown only to the caller user.</summary>
        /// <param name="ephemeral">Whether the response should be shown only to the caller user.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder WithEphemeral(bool ephemeral = true)
        {
            if (this.Flags == null)
                this.Flags = ephemeral
                    ? (DiscordInteractionResponseFlags?)DiscordInteractionResponseFlags.Ephemeral
                    : null;
            else
            {
                if (ephemeral)
                    this.Flags = this.Flags.Value | DiscordInteractionResponseFlags.Ephemeral;
                else
                    this.Flags &= ~DiscordInteractionResponseFlags.Ephemeral;
            }
            return this;
        }

        /// <summary>Adds a new embed.</summary>
        /// <param name="embed">The embed to add.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder AddEmbed(DiscordEmbed embed)
        {
            if (this.Embeds == null)
                this.Embeds = new List<DiscordEmbed>();
            this.Embeds.Add(embed);
            return this;
        }
        /// <summary>Adds a new embed.</summary>
        /// <param name="configure">Delegate allowing configuration of the new embed.</param>
        /// <returns>Current builder.</returns>
        public DiscordInteractionResponseBuilder AddEmbed(Action<DiscordEmbedBuilder> configure)
        {
            DiscordEmbedBuilder builder = new DiscordEmbedBuilder();
            configure.Invoke(builder);
            return this.AddEmbed(builder.Build());
        }

        /// <summary>Builds the response.</summary>
        /// <returns>A new instance of a Discord Interaction Response.</returns>
        public DiscordInteractionResponse Build()
        {
            DiscordInteractionResponse result = new DiscordInteractionResponse(this.Type);

            // determine if Data element needs to be created
            if (this.IsTTS || !string.IsNullOrEmpty(this.Content) || this.Embeds?.Any() == true ||
                this.AllowedMentions != null || this.Flags != null)
            {
                result.Data = new DiscordInteractionResponseData();
                result.Data.IsTTS = this.IsTTS;
                result.Data.Content = this.Content;
                result.Data.AllowedMentions = this.AllowedMentions;
                result.Data.Flags = this.Flags;
                if (this.Embeds?.Any() == true)
                    result.Data.Embeds = this.Embeds;
            }

            return result;
        }
    }
}
