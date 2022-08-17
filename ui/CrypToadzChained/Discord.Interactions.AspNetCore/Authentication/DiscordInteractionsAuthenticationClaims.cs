using System.Security.Claims;

namespace TehGM.Discord.Interactions.AspNetCore.Authentication
{
    /// <summary>Names of claims used during Discord Interactions authentication.</summary>
    public static class DiscordInteractionsAuthenticationClaims
    {
        /// <summary>Name of the claim representing user's ID.</summary>
        public const string UserID = ClaimTypes.NameIdentifier;
        /// <summary>Name of the claim representing user's username.</summary>
        public const string Username = ClaimTypes.Name;
        /// <summary>Name of the claim representing user's discriminator.</summary>
        public const string UserDiscriminator = "urn:discord:user:discriminator";
        /// <summary>Name of the claim representing user's public flags.</summary>
        public const string UserPublicFlags = "urn:discord:user:public_flags";

        /// <summary>Name of the claim representing ID of the interaction.</summary>
        public const string InteractionID = "urn:discord:interaction:id";
        /// <summary>Name of the claim representing ID of the Discord application.</summary>
        public const string ApplicationID = "urn:discord:interaction:application_id";
    }
}
