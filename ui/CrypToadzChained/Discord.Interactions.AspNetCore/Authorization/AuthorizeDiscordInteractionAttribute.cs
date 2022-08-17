using TehGM.Discord.Interactions.AspNetCore.Authentication;

namespace Microsoft.AspNetCore.Authorization
{
    /// <summary>Specifies that the class or method that this attribute is applied to requires Discord Interactions authorization.</summary>
    public class AuthorizeDiscordInteractionAttribute : AuthorizeAttribute
    {
        /// <summary>Initializes a new instance of the <see cref="AuthorizeDiscordInteractionAttribute"/> class.</summary>
        /// <remarks>This constructor automatically sets the value of <see cref="AuthorizeAttribute.AuthenticationSchemes"/> to <see cref="DiscordInteractionsAuthenticationDefaults.AuthenticationScheme"/>.
        /// If you wish to override that, set the value of <see cref="AuthorizeAttribute.AuthenticationSchemes"/> property directly.</remarks>
        public AuthorizeDiscordInteractionAttribute()
        {
            base.AuthenticationSchemes = DiscordInteractionsAuthenticationDefaults.AuthenticationScheme;
        }
    }
}
