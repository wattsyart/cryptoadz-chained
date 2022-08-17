using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using TehGM.Discord.Interactions;
using TehGM.Discord.Interactions.AspNetCore;

namespace Microsoft.AspNetCore.Builder
{
    /// <summary>Extension methods for adding Discord Interactions middlewares.</summary>
    public static class DiscordInteractionsMiddlewareExtensions
    {
        /// <summary>Adds Discord Interactions middlewares to the pipeline.</summary>
        /// <param name="app">The <see cref="IApplicationBuilder"/>.</param>
        /// <returns>The <see cref="IApplicationBuilder"/>.</returns>
        public static IApplicationBuilder UseDiscordInteractions(this IApplicationBuilder app)
            => UseDiscordInteractions(app, null);

        /// <summary>Adds Discord Interactions middlewares to the pipeline. Should be called before UseRouting().</summary>
        /// <param name="app">The <see cref="IApplicationBuilder"/>.</param>
        /// <param name="optionsName">Name of named options to use.</param>
        /// <returns>The <see cref="IApplicationBuilder"/>.</returns>
        public static IApplicationBuilder UseDiscordInteractions(this IApplicationBuilder app, string optionsName)
        {
            if (app == null)
                throw new ArgumentNullException(nameof(app));

            IOptionsMonitor<DiscordInteractionsOptions> optionsService = app.ApplicationServices.GetRequiredService<IOptionsMonitor<DiscordInteractionsOptions>>();
            DiscordInteractionsOptions options = optionsName == null ? optionsService.CurrentValue : optionsService.Get(optionsName);

            // if routes are null, use on all routes
            if (options.Routes == null)
                app.UseDiscordInteractionsCore(options);
            else
                app.UseWhen(context => options.Routes.Contains(context.Request.Path),
                    builder => builder.UseDiscordInteractionsCore(options));

            return app;
        }

        private static IApplicationBuilder UseDiscordInteractionsCore(this IApplicationBuilder app, DiscordInteractionsOptions options)
        {
            if (app == null)
                throw new ArgumentNullException(nameof(app));

            app.UseMiddleware<DiscordInteractionReaderMiddleware>();
            app.UseMiddleware<DiscordSignatureVerificationMiddleware>(options);
            if (options.HandlePings)
                app.UseMiddleware<DiscordPingHandlingMiddleware>(); 
            app.UseMiddleware<DiscordInteractionCommandsMiddleware>();

            return app;
        }
    }
}
