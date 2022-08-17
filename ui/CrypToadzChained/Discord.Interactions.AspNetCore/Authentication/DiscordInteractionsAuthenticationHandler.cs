using System.IO;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions.AspNetCore.Authentication
{
    /// <summary>Authentication handler that authenticates Discord users based on Discord Interaction data.</summary>
    public class DiscordInteractionsAuthenticationHandler : AuthenticationHandler<DiscordInteractionsAuthenticationOptions>
    {
        /// <summary>Creates a new instance of the handler.</summary>
        /// <param name="options"></param>
        /// <param name="logger"></param>
        /// <param name="encoder"></param>
        /// <param name="clock"></param>
        public DiscordInteractionsAuthenticationHandler(IOptionsMonitor<DiscordInteractionsAuthenticationOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) :
            base(options, logger, encoder, clock) { }

        /// <summary>Performs the authentication.</summary>
        /// <returns>Result of the authentication.</returns>
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            // enable buffering so the body can be read multiple times
            base.Request.EnableBuffering();

            using StreamReader reader = new StreamReader(base.Request.Body, Encoding.UTF8, leaveOpen: true,
                detectEncodingFromByteOrderMarks: true, bufferSize: -1);    // defaults as of .NET 5

            // parse body
            string body = await reader.ReadToEndAsync().ConfigureAwait(false);
            JObject json = JObject.Parse(body);
            // reset stream position so it can be re-read later
            base.Request.Body.Position = 0;

            // so... Discord interaction will have either User object, or Guild Member object that has user object inside
            // instead of freaking providing it in the top level user object either way!
            JToken guildMemberJson = json["member"];
            JToken userJson = json["user"] ?? guildMemberJson?["user"];
            if (userJson == null)
                return AuthenticateResult.NoResult();

            ulong? discordUserID = userJson?["id"]?.Value<ulong>();
            if (discordUserID == null)
                return AuthenticateResult.NoResult();

            // build claims for the user
            ClaimsIdentity identity = new ClaimsIdentity(base.ClaimsIssuer);
            identity.AddClaim(new Claim(DiscordInteractionsAuthenticationClaims.InteractionID, json["id"].ToString()));
            identity.AddClaim(new Claim(DiscordInteractionsAuthenticationClaims.ApplicationID, json["application_id"].ToString()));
            identity.AddClaim(new Claim(DiscordInteractionsAuthenticationClaims.UserID, discordUserID.ToString()));
            identity.AddClaim(new Claim(DiscordInteractionsAuthenticationClaims.Username, userJson["username"].ToString()));
            identity.AddClaim(new Claim(DiscordInteractionsAuthenticationClaims.UserDiscriminator, userJson["discriminator"].ToString()));
            identity.AddClaim(new Claim(DiscordInteractionsAuthenticationClaims.UserPublicFlags, userJson["public_flags"].ToString()));
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);

            // let events run
            CreatingTicketContext ticketContext = new CreatingTicketContext(base.Context, base.Scheme, base.Options, principal, userJson, guildMemberJson);
            await (base.Events as DiscordInteractionsAuthenticationEvents)?.CreatingTicket(ticketContext);
            if (ticketContext.Result?.None != true)
                return ticketContext.Result;

            // return result
            return AuthenticateResult.Success(new AuthenticationTicket(ticketContext.Principal, base.Scheme.Name));
        }
    }
}
