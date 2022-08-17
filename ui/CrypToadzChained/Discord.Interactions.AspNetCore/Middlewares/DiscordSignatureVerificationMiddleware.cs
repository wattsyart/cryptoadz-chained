using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace TehGM.Discord.Interactions.AspNetCore
{
    /// <summary>A middleware that automatically validates Discord's signature.</summary>
    /// <remarks><para>Discord sends all interactions with a signature, and requires that signature is validated to prevent bad actors interacting with your endpoints. 
    /// Additionally Discord will periodically send an interaction with invalid signature to validate that your application does the signature validation.</para>
    /// <para>This middleware handles signature validation, and automatically responds with status code 401 if validation has failed.</para>
    /// <para>This middleware is short-circuiting. This means that if signature validation has failed, no further middleware or controllers will receive the message.</para></remarks>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization"/>
    public class DiscordSignatureVerificationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _log;
        private readonly DiscordInteractionsOptions _options;

        /// <summary>Creates an instance of the middleware.</summary>
        /// <param name="next">Delegate to the next middleware.</param>
        /// <param name="options">Options with <see cref="DiscordInteractionsOptions.PublicKey"/> used to validate the signature.</param>
        /// <param name="log">Logger this middleware will use to log messages to.</param>
        public DiscordSignatureVerificationMiddleware(RequestDelegate next, DiscordInteractionsOptions options, ILogger<DiscordSignatureVerificationMiddleware> log)
        {
            this._next = next;
            this._options = options;
            this._log = log;
        }

        /// <summary>Invokes the middleware for given request context.</summary>
        /// <param name="context">The request context.</param>
        /// <returns></returns>
        public Task InvokeAsync(HttpContext context)
        {
            this._log.LogTrace("Validating Discord's signature");
            if (!context.Request.Headers.TryGetValue("X-Signature-Ed25519", out StringValues signatureValues) ||
                !context.Request.Headers.TryGetValue("X-Signature-Timestamp", out StringValues timestampValues))
                return RespondInvalidSignature();

            string timestamp = timestampValues.ToString();
            string body = context.Features.Get<IDiscordInteractionReaderFeature>().InteractionRaw;

            byte[] key = Sodium.Utilities.HexToBinary(this._options.PublicKey);
            byte[] signature = Sodium.Utilities.HexToBinary(signatureValues.ToString());
            byte[] message = Encoding.UTF8.GetBytes(timestamp + body);

            if (!Sodium.PublicKeyAuth.VerifyDetached(signature, message, key))
                return RespondInvalidSignature();
            else
            {
                this._log.LogTrace("Discord signature valid");
                return this._next.Invoke(context);
            }

            Task RespondInvalidSignature()
            {
                this._log.LogDebug("Discord signature not valid, returning 401 Unauthorized");
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return context.Response.WriteAsync("Invalid signature");
            }
        }
    }
}
