using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions.AspNetCore
{
    /// <summary>A middleware that automatically handles ping messages sent by Discord.</summary>
    /// <remarks><para>Discord periodically sends a ping and requires a response. This middleware automatically handles responding to Discord's pings.</para>
    /// <para>With this middleware enabled, your controllers will never receive a ping interaction. If you wish to receive pings in your controller,
    /// do not enable this middleware. Note that you'll have to handle pings manually in such scenario.</para></remarks>
    /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction"/>
    public class DiscordPingHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _log;

        /// <summary>Creates an instance of the middleware.</summary>
        /// <param name="next">Delegate to the next middleware.</param>
        /// <param name="log">Logger this middleware will use to log messages to.</param>
        public DiscordPingHandlingMiddleware(RequestDelegate next, ILogger<DiscordPingHandlingMiddleware> log)
        {
            this._next = next;
            this._log = log;
        }

        /// <summary>Invokes the middleware for given request context.</summary>
        /// <param name="context">The request context.</param>
        /// <returns></returns>
        public Task InvokeAsync(HttpContext context)
        {
            JObject json = context.Features.Get<IDiscordInteractionReaderFeature>().InteractionJson;

            // if type == 1, respond with pong
            if (json["type"].Value<int>() == (int)DiscordInteractionType.Ping)
            {
                this._log.LogDebug("Discord interaction ping received, returning pong");
                context.Response.StatusCode = (int)HttpStatusCode.OK;
                context.Response.Headers.Add("Content-Type", "application/json");
                return context.Response.WriteAsync(
                    JObject.FromObject(DiscordInteractionResponse.Pong).ToString(Formatting.None),
                    context.RequestAborted);
            }

            // otherwise pass on
            this._log.LogTrace("Not a Discord interaction ping message");
            return this._next.Invoke(context);
        }
    }
}
