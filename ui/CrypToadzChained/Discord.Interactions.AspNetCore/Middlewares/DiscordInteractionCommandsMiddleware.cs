using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TehGM.Discord.Interactions.CommandsHandling;

namespace TehGM.Discord.Interactions.AspNetCore
{
    /// <summary>A middleware that invokes registered <see cref="IDiscordInteractionCommandHandler"/>.</summary>
    /// <remarks><para>When an interaction is received, this middleware will check registered command handlers for one that can handle the interaction.
    /// If the handler was found, the command will be invoked, and no further middleware or controller will run.</para>
    /// <para>If no command with matching ID is found, the request will be passed further the middleware pipeline.</para></remarks>
    public class DiscordInteractionCommandsMiddleware : IMiddleware
    {
        private readonly ILogger _log;
        private readonly IDiscordInteractionCommandHandlerProvider _commands;

        /// <summary>Creates an instance of the middleware.</summary>
        /// <param name="log">Logger this middleware will use to log messages to.</param>
        /// <param name="commands">Provider of registered Interaction Commands.</param>
        public DiscordInteractionCommandsMiddleware(ILogger<DiscordInteractionCommandsMiddleware> log, IDiscordInteractionCommandHandlerProvider commands)
        {
            this._log = log;
            this._commands = commands;
        }

        /// <summary>Invokes the middleware for given request context.</summary>
        /// <param name="next">Delegate to the next middleware.</param>
        /// <param name="context">The request context.</param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            // check command ID. If it cannot be retrieved, pass
            IDiscordInteractionReaderFeature feature = context.Features.Get<IDiscordInteractionReaderFeature>();
            ulong? commandID = feature?.InteractionJson?["data"]?["id"]?.Value<ulong>();
            if (commandID == null)
            {
                await next.Invoke(context).ConfigureAwait(false);
                return;
            }
            // try to get command handler
            // if cannot, then also pass
            IDiscordInteractionCommandHandler cmd = this._commands.GetHandler(commandID.Value);
            if (cmd == null)
            {
                await next.Invoke(context).ConfigureAwait(false);
                return;
            }

            // command was found, so invoke it, and return the message
            this._log.LogDebug("Invoking command {ID}", commandID.Value);
            DiscordInteractionResponse response = await cmd.InvokeAsync(feature.Interaction, context.Request, context.RequestAborted).ConfigureAwait(false);
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            context.Response.Headers.Add("Content-Type", "application/json");
            await context.Response.WriteAsync(JObject.FromObject(response).ToString(Formatting.None), context.RequestAborted).ConfigureAwait(false);
        }
    }
}
