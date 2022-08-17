using Newtonsoft.Json;

namespace TehGM.Discord
{
    /// <summary>Represents a Discord User.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/user"/>
    public class DiscordUser
    {
        /// <summary>The user's ID.</summary>
        [JsonProperty("id")]
        public ulong ID { get; private set; }
        /// <summary>the user's username, not unique across the platform</summary>
        [JsonProperty("username")]
        public string Username { get; private set; }
        /// <summary>the user's 4-digit discord-tag</summary>
        [JsonProperty("discriminator")]
        public string Discriminator { get; private set; }
        /// <summary>the user's avatar hash</summary>
        /// <seealso href="https://discord.com/developers/docs/reference#image-formatting"/>
        [JsonProperty("avatar")]
        public string AvatarHash { get; private set; }
#pragma warning disable CS0649 // unassigned warning
        [JsonProperty("bot", NullValueHandling = NullValueHandling.Ignore)]
        private bool? _bot;
#pragma warning restore CS0649
        /// <summary>whether the user belongs to an OAuth2 application</summary>
        [JsonIgnore]
        public bool IsBot => this._bot == true;
#pragma warning disable CS0649 // unassigned warning
        [JsonProperty("system", NullValueHandling = NullValueHandling.Ignore)]
        private bool? _system;
#pragma warning restore CS0649
        /// <summary>whether the user is an Official Discord System user (part of the urgent message system)</summary>
        [JsonIgnore]
        public bool IsSystem => this._system == true;
        /// <summary>whether the user has two factor enabled on their account</summary>
        [JsonProperty("mfa_enabled", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsMultiFactorAuthenticationEnabled { get; private set; }
        /// <summary>the user's banner hash</summary>
        /// <seealso href="https://discord.com/developers/docs/reference#image-formatting"/>
        [JsonProperty("banner", NullValueHandling = NullValueHandling.Ignore)]
        public string BannerHash { get; private set; }
        /// <summary>The user's banner color.</summary>
        [JsonProperty("accent_color", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordColor? BannerColor { get; private set; }
        /// <summary>the user's chosen language option</summary>
        [JsonProperty("locale", NullValueHandling = NullValueHandling.Ignore)]
        public string Language { get; private set; }
        /// <summary>the flags on a user's account</summary>
        [JsonProperty("flags", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordUserFlags? Flags { get; private set; }
        /// <summary>The public flags on a user's account.</summary>
        [JsonProperty("public_flags", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordUserFlags? PublicFlags { get; private set; }
        /// <summary>the type of Nitro subscription on a user's account</summary>
        [JsonProperty("premium_type", NullValueHandling = NullValueHandling.Ignore)]
        public DiscordPremiumType? PremiumType { get; private set; }

        /// <summary>Creates a new instance of this class.</summary>
        /// <remarks>This constructor exists for JSON deserialization.</remarks>
        [JsonConstructor]
        protected DiscordUser() { }
    }

    /// <summary>Discord user's flags.</summary>
    /// <seealso href="https://discord.com/developers/docs/resources/user#user-object-user-flags"/>
    [System.Flags]
    public enum DiscordUserFlags
    {
        /// <summary>None.</summary>
        None = 0,
        /// <summary>Discord Employee.</summary>
        DiscordEmployee = 1 << 0,
        /// <summary>Partnered Server Owner.</summary>
        PartneredServerOwner = 1 << 1,
        /// <summary>HypeSquad Events.</summary>
        HypeSquadEvents = 1 << 2,
        /// <summary>Bug Hunter Level 1.</summary>
        BugHunterLevel1 = 1 << 3,
        /// <summary>House Bravery.</summary>
        HouseBravery = 1 << 6,
        /// <summary>House Brilliance.</summary>
        HouseBrilliance = 1 << 7,
        /// <summary>House Balance.</summary>
        HouseBalance = 1 << 8,
        /// <summary>Early Supporter.</summary>
        EarlySupporter = 1 << 9,
        /// <summary>Team User.</summary>
        TeamUser = 1 << 10,
        /// <summary>Bug Hunter Level 2.</summary>
        BugHunterLevel2 = 1 << 14,
        /// <summary>Verified Bot.</summary>
        VerifiedBot = 1 << 16,
        /// <summary>Early Verified Bot Developer.</summary>
        EarlyVerifiedBotDeveloper = 1 << 17,
        /// <summary>Discord Certified Moderator.</summary>
        DiscordCertifiedModerator = 1 << 18
    }
}
