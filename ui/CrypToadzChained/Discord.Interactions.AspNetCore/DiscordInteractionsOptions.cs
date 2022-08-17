using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using TehGM.Discord.Interactions.AspNetCore;
using TehGM.Discord.Interactions.CommandsHandling;

namespace TehGM.Discord.Interactions
{
    /// <summary>Application options for Discord Interactions.</summary>
    public class DiscordInteractionsOptions
    {
        // COMMANDS REGISTRATION
        /// <summary>Discord application Application ID. Required for commands registration.</summary>
        /// <remarks>Used for signature verification.</remarks>
        /// <seealso href="https://discord.com/developers/applications"/>
        public string ApplicationID { get; set; }
        /// <summary>The user agent to use when making requests to Discord API servers. Required for commands registration.</summary>
        public string UserAgent { get; set; } = $"Discord.Interactions.AspNetCore (v{GetVersion()})";
        /// <summary>The bot token to authenticate with when making requests to Discord API servers. Used when <see cref="BearerToken"/> is null. Required for commands registration.</summary>
        /// <seealso href="https://discord.com/developers/applications"/>
        public string BotToken { get; set; }
        /// <summary>The bearer token to authenticate with when making requests to Discord API servers. Takes priority over <see cref="BotToken"/>. Required for commands registration.</summary>
        /// <seealso href="https://discord.com/developers/applications"/>
        /// <seealso href="https://discord.com/developers/docs/topics/oauth2#client-credentials-grant"/>
        public string BearerToken { get; set; }
        /// <summary>Base API URL for API requests. Required for commands registration.</summary>
        public string BaseApiURL { get; set; } = "https://discord.com/api/v9/";
        /// <summary>Whether the commands should be automatically registered.</summary>
        /// <remarks><para>Registration of commands overwrites all previously registered commands. For this reason, it's opt-in.</para>
        /// <para>However, if this option is disabled, the library won't support any <see cref="IDiscordInteractionCommandHandler"/> - manual registration or handling commands in a controller will be required.</para></remarks>
        public bool RegisterCommands { get; set; } = false;
        /// <summary>Set of assemblies interaction commands should be automatically loaded from.</summary>
        /// <remarks>Entry assembly is included by default.</remarks>
        public ICollection<Assembly> CommandAssemblies { get; set; } = new List<Assembly>() { Assembly.GetEntryAssembly() };


        // MIDDLEWARES
        /// <summary>Discord application Public Key.</summary>
        /// <remarks>Used for signature verification.</remarks>
        /// <seealso href="https://discord.com/developers/applications"/>
        public string PublicKey { get; set; }
        /// <summary>The routes that middlewares should be enabled on. All routes must begin with leading '/' in order to be recognized.</summary>
        /// <remarks><para>`/api/discord/interactions` route is added by default. Clear or recreate this collection if you wish to remove the default route.</para>
        /// <para>Multiple routes can be added. Middlewares will run on all added routes.</para>
        /// <para>To make middlewares run on all routes, set this value to null.</para>
        /// <para>Routes are case insensitive by default. To change this, recreate the collection object.</para>
        /// <para>Please note that <see cref="DiscordSignatureVerificationMiddleware"/> will be ran on all provided routes. Do not add routes that need to be used for non-interactions operations.</para></remarks>
        /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization"/>
        /// <seealso cref="DiscordSignatureVerificationMiddleware"/>
        public ICollection<string> Routes { get; set; } = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { "/api/discord/interactions" };
        /// <summary>Whether middleware for ping message handling should be registered. Defaults to true.</summary>
        /// <remarks>This value directly determines if <see cref="DiscordPingHandlingMiddleware"/> should be added to pipeline when calling <see cref="DiscordInteractionsMiddlewareExtensions.UseDiscordInteractions(IApplicationBuilder)"/>.
        /// After that method is called, changing this property will have no effect.</remarks>
        /// <seealso href="https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction"/>
        public bool HandlePings { get; set; } = true;


        // UTILS
        private static string GetVersion()
        {
            FileVersionInfo version = FileVersionInfo.GetVersionInfo(typeof(DiscordInteractionsOptions).Assembly.Location);

            string result = $"{version.ProductMajorPart}.{version.ProductMinorPart}.{version.ProductBuildPart}";
            if (version.FilePrivatePart != 0)
                result += $" r{version.FilePrivatePart}";

            return result;
        }
    }
}
