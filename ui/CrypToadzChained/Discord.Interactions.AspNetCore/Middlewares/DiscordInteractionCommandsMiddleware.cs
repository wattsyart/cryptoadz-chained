using System.Net;
using System.Threading.Tasks;
using Discord.Interactions.AspNetCore.CommandsHandling.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Discord.Interactions.AspNetCore.Middlewares
{
    public sealed class DiscordInteractionCommandsMiddleware : IMiddleware
    {
        private readonly ILogger _log;
        private readonly IDiscordInteractionCommandHandlerProvider _commands;

        /// <summary>Creates an instance of the middleware.</summary>
        /// <param name="log">Logger this middleware will use to log messages to.</param>
        /// <param name="commands">Provider of registered Interaction Commands.</param>
        public DiscordInteractionCommandsMiddleware(ILogger<DiscordInteractionCommandsMiddleware> log, IDiscordInteractionCommandHandlerProvider commands)
        {
            _log = log;
            _commands = commands;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var feature = context.Features.Get<IDiscordInteractionReaderFeature>();
            var commandId = feature?.InteractionJson?["data"]?["id"]?.Value<ulong>();
            if (commandId == null)
            {
                await next.Invoke(context).ConfigureAwait(false);
                return;
            }

            var command = _commands.GetHandler(commandId.Value);
            if (command == null)
            {
                await next.Invoke(context).ConfigureAwait(false);
                return;
            }

            _log.LogDebug("Invoking command {ID}", commandId.Value);
            var response = await command.InvokeAsync(feature.Interaction, context.RequestServices, context.Request, context.RequestAborted).ConfigureAwait(false);
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            context.Response.Headers.Add("Content-Type", "application/json");
            await context.Response.WriteAsync(JObject.FromObject(response).ToString(Formatting.None), context.RequestAborted).ConfigureAwait(false);
        }
    }
}
