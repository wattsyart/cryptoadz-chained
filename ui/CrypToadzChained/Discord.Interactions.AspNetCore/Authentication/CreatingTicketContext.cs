using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions.AspNetCore.Authentication
{
    /// <summary>Provides context information to Discord Interaction authentication events.</summary>
    public class CreatingTicketContext : ResultContext<DiscordInteractionsAuthenticationOptions>
    {
        /// <summary>JSON of the user object.</summary>
        public JToken UserJson { get; }
        /// <summary>JSON of the guild member object.</summary>
        public JToken GuildMemberJson { get; }
        /// <summary>The identity as created by <see cref="DiscordInteractionsAuthenticationHandler"/>.</summary>
        public ClaimsIdentity Identity => base.Principal?.Identity as ClaimsIdentity;

        /// <summary>Creates a new instance of the context.</summary>
        /// <param name="context">The context.</param>
        /// <param name="scheme">The authentication scheme.</param>
        /// <param name="options">The authentication options associated with the scheme.</param>
        /// <param name="principal">Principal as created by <see cref="DiscordInteractionsAuthenticationHandler"/>.</param>
        /// <param name="userJson">JSON of the user object.</param>
        /// <param name="guildMemberJson">JSON of the guild member object.</param>
        public CreatingTicketContext(HttpContext context, AuthenticationScheme scheme, DiscordInteractionsAuthenticationOptions options,
            ClaimsPrincipal principal, JToken userJson, JToken guildMemberJson)
            : base(context, scheme, options)
        {
            this.UserJson = userJson;
            this.GuildMemberJson = guildMemberJson;
            base.Principal = principal;
        }
    }
}
