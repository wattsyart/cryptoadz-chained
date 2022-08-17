namespace TehGM.Discord
{
    /// <summary>Type of a Discord Embed.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/channel#embed-object-embed-types"/>
    public enum DiscordEmbedType
    {
        /// <summary>Generic embed rendered from embed attributes.</summary>
        Rich,
        /// <summary>Image embed.</summary>
        Image,
        /// <summary>Video embed.</summary>
        Video,
        /// <summary>Animated gif image embed rendered as a video embed.</summary>
        Gifv,
        /// <summary>Article embed.</summary>
        Article,
        /// <summary>Link embed.</summary>
        Link
    }
}
