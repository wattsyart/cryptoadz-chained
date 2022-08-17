using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TehGM.Discord.Interactions.AspNetCore.Services;

namespace TehGM.Discord.Interactions.AspNetCore
{
    /// <summary>A middleware that reads Discord Interaction from request and stores as a request feature so it can be easily used later in the pipeline.</summary>
    /// <remarks><para>Discord Interaction data is used by multiple middlewares in the pipeline. Each of these middlewares needs to access request body in various forms.</para>
    /// <para>This middleware prevents unnecessary re-reading of the request multiple times by reading it once and storing as <see cref="IDiscordInteractionReaderFeature"/> in Request.Features.</para>
    /// <para>The default implementation of this interface uses lazy loading of JSON and Typed representations of interaction data, so it's only parsed when that's actually needed.</para></remarks>
    public class DiscordInteractionReaderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _log;

        /// <summary>Creates an instance of the middleware.</summary>
        /// <param name="next">Delegate to the next middleware.</param>
        /// <param name="log">Logger this middleware will use to log messages to.</param>
        public DiscordInteractionReaderMiddleware(RequestDelegate next, ILogger<DiscordInteractionReaderMiddleware> log)
        {
            this._next = next;
            this._log = log;
        }

        /// <summary>Invokes the middleware for given request context.</summary>
        /// <param name="context">The request context.</param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context)
        {
            this._log.LogTrace("Reading Discord Interaction body");

            // enable buffering so the body can be read multiple times
            context.Request.EnableBuffering();

            using (StreamReader reader = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true,
                detectEncodingFromByteOrderMarks: true, bufferSize: -1))    // defaults as of .NET 5
            {
                // parse body
                string body = await reader.ReadToEndAsync().ConfigureAwait(false);

                // reset stream position so it can be re-read in later middleware
                context.Request.Body.Position = 0;

                // store feature
                if (!string.IsNullOrWhiteSpace(body))
                    context.Features.Set<IDiscordInteractionReaderFeature>(
                        new DiscordInteractionReaderFeature(body));
            }

            await this._next.Invoke(context);
        }
    }
}
