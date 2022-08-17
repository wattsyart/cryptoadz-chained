using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace TehGM.Discord.Interactions.CommandsHandling.Registration.Services
{
    /// <summary>A service that handles registration of new Discord Application Commands.</summary>
    public class DiscordInteractionCommandsRegistrar : IDiscordInteractionCommandsRegistrar, IHostedService
    {
        /// <summary>Logger that can be used to log messages.</summary>
        protected ILogger Log { get; }
        /// <summary>Options used when registering commands.</summary>
        protected DiscordInteractionsOptions Options { get; }
        /// <summary>Service provider used when registering commands.</summary>
        protected IServiceProvider Services { get; }

        private readonly IDiscordInteractionCommandsLoader _loader;
        private readonly IDiscordInteractionCommandHandlerFactory _factory;
        private readonly IDiscordInteractionCommandBuilder _builder;

        /// <summary>Creates a new instance of the service.</summary>
        /// <param name="log">Used for logging registration events.</param>
        /// <param name="options">Options for registration.</param>
        /// <param name="services">Service provider that can be used when injecting dependencies.</param>
        /// <param name="loader">Service loading command handlers from assemblies.</param>
        /// <param name="factory">Factory for command handlers.</param>
        /// <param name="builder">Service that builds commands.</param>
        public DiscordInteractionCommandsRegistrar(ILogger<DiscordInteractionCommandsRegistrar> log, IOptions<DiscordInteractionsOptions> options, IServiceProvider services,
            IDiscordInteractionCommandsLoader loader, IDiscordInteractionCommandHandlerFactory factory, IDiscordInteractionCommandBuilder builder)
        {
            this.Log = log;
            this.Options = options.Value;
            this.Services = services;
            this._loader = loader;
            this._factory = factory;
            this._builder = builder;
        }

        /// <inheritdoc/>
        async Task IHostedService.StartAsync(CancellationToken cancellationToken)
        {
            if (!this.Options.RegisterCommands)
            {
                this.Log.LogDebug("Registering Discord Application Commands is disabled");
                return;
            }

            this.Log.LogInformation("Registering Discord Application Commands");
            this.Log.LogTrace("Loading types implementing {Type} from assemblies", nameof(IDiscordInteractionCommandHandler));
            List<TypeInfo> commandTypes = new List<TypeInfo>();
            foreach (Assembly asm in this.Options.CommandAssemblies)
                commandTypes.AddRange(this._loader.LoadFromAssembly(asm));

            this.Log.LogDebug("{Count} types implementing {Type} interface loaded from assemblies", commandTypes.Count, nameof(IDiscordInteractionCommandHandler));
            if (!commandTypes.Any())
                return;

            // perform registration
            await this.RegisterGlobalCommandsAsync(commandTypes, cancellationToken).ConfigureAwait(false);
            await this.RegisterGuildCommandsAsync(commandTypes, cancellationToken).ConfigureAwait(false);
            await this.RegisterAdditionalCommandsAsync(commandTypes, cancellationToken).ConfigureAwait(false);
        }

        /// <summary>Allows to register additional commands, that might've been filtered out. Called after Global and Guild commands registration.</summary>
        /// <remarks>Default filtering logic will register all commands before calling this method. This method is meant to be used when overriding <see cref="GetGlobalHandlerTypes(IEnumerable{TypeInfo})"/> and/or <see cref="GetGuildHandlerTypes(IEnumerable{TypeInfo})"/>.</remarks>
        /// <param name="allHandlerTypes">All command handler types found when loading.</param>
        /// <param name="cancellationToken">Token for operation cancellation.</param>
        /// <returns>Asynchronous task.</returns>
        protected virtual Task RegisterAdditionalCommandsAsync(IEnumerable<TypeInfo> allHandlerTypes, CancellationToken cancellationToken)
            => Task.CompletedTask;

        /// <summary>Filters command handler types, returning only ones that are global.</summary>
        /// <param name="allHandlerTypes">All command handler types found when loading.</param>
        /// <returns>Command handler types that are global commands.</returns>
        /// <seealso cref="GetGuildHandlerTypes(IEnumerable{TypeInfo})"/>
        protected virtual IEnumerable<TypeInfo> GetGlobalHandlerTypes(IEnumerable<TypeInfo> allHandlerTypes)
        {
            return allHandlerTypes.Where(type =>
                type.GetCustomAttribute<GuildInteractionCommandAttribute>() == null);
        }

        /// <summary>Filters command handler types, returning only ones that are guild.</summary>
        /// <param name="allHandlerTypes">All command handler types found when loading.</param>
        /// <returns>Command handler types that are guild commands.</returns>
        /// <see cref="GetGlobalHandlerTypes(IEnumerable{TypeInfo})"/>
        /// <see cref="GetGuildIDs(TypeInfo)"/>
        protected virtual IEnumerable<TypeInfo> GetGuildHandlerTypes(IEnumerable<TypeInfo> allHandlerTypes)
        {
            return allHandlerTypes.Where(type =>
                type.GetCustomAttribute<GuildInteractionCommandAttribute>() != null);
        }

        /// <summary>Selects guild IDs to register command from handler type for.</summary>
        /// <param name="handlerType">Type of the handler.</param>
        /// <returns>Enumerable of guild IDs.</returns>
        /// <seealso cref="GetGuildHandlerTypes(IEnumerable{TypeInfo})"/>
        protected virtual IEnumerable<ulong> GetGuildIDs(TypeInfo handlerType)
            => handlerType.GetCustomAttribute<GuildInteractionCommandAttribute>().GuildIDs;

        private Task RegisterGlobalCommandsAsync(IEnumerable<TypeInfo> handlerTypes, CancellationToken cancellationToken)
        {
            // filter out guild commands
            handlerTypes = this.GetGlobalHandlerTypes(handlerTypes);
            if (handlerTypes?.Any() != true)
                return Task.CompletedTask;

            this.Log.LogDebug("Registering global Discord Application commands");
            return this.BuildAndRegisterCommandsAsync(handlerTypes, null, cancellationToken);
        }

        private async Task RegisterGuildCommandsAsync(IEnumerable<TypeInfo> handlerTypes, CancellationToken cancellationToken)
        {
            // filter out commands that don't have guild command attribute
            handlerTypes = this.GetGuildHandlerTypes(handlerTypes);
            if (handlerTypes?.Any() != true)
                return;

            // get guild IDs for each handler
            IDictionary<TypeInfo, IEnumerable<ulong>> guildsPerHandler = new Dictionary<TypeInfo, IEnumerable<ulong>>(handlerTypes.Count());
            foreach (TypeInfo type in handlerTypes)
                guildsPerHandler.Add(type, this.GetGuildIDs(type));

            // grab all guild IDs specified
            IEnumerable<ulong> guildIDs = guildsPerHandler.SelectMany(pair => pair.Value).Distinct();
            if (guildIDs?.Any() != true)
                return;

            foreach (ulong gid in guildIDs)
            {
                using IDisposable logScope = this.Log.BeginScope(new Dictionary<string, object> { { "GuildID", gid } });
                this.Log.LogDebug("Registering Discord Application commands for guild {GuildID}", gid);

                // get handlers only for given guild ID
                IEnumerable<TypeInfo> guildHandlerTypes = guildsPerHandler
                    .Where(pair => pair.Value.Contains(gid))
                    .Select(pair => pair.Key);

                // register them
                await this.BuildAndRegisterCommandsAsync(guildHandlerTypes, gid, cancellationToken).ConfigureAwait(false);
            }
        }

        /// <summary>Builds and registers specified commands.</summary>
        /// <remarks>Call this method when overriding <see cref="RegisterAdditionalCommandsAsync(IEnumerable{TypeInfo}, CancellationToken)"/>.</remarks>
        /// <param name="handlerTypes">Types of handlers to load commands from.</param>
        /// <param name="guildID">ID of the guild. Null for global commands.</param>
        /// <param name="cancellationToken">Token for operation cancellation.</param>
        /// <returns>Asynchronous task.</returns>
        protected async Task BuildAndRegisterCommandsAsync(IEnumerable<TypeInfo> handlerTypes, ulong? guildID, CancellationToken cancellationToken)
        {
            if (handlerTypes?.Any() != true)
                return;

            // map commands based on name - will be needed to get IDs
            // do this by building commands while at it, I guess
            List<DiscordApplicationCommand> builtCommands = new List<DiscordApplicationCommand>(handlerTypes.Count());
            Dictionary<CommandKey, ServiceDescriptor> commandNames = new Dictionary<CommandKey, ServiceDescriptor>(handlerTypes.Count());
            foreach (TypeInfo type in handlerTypes)
            {
                // create descriptor
                ServiceLifetime lifetime = type.GetCustomAttribute<InteractionCommandLifetimeAttribute>()?.Lifetime
                    ?? InteractionCommandLifetimeAttribute.DefaultLifetime;
                ServiceDescriptor descriptor = new ServiceDescriptor(type, type, lifetime);

                // build command
                DiscordApplicationCommand builtCmd = await this._builder.BuildAsync(type, cancellationToken).ConfigureAwait(false);
                builtCommands.Add(builtCmd);

                // store result
                commandNames.Add(CommandKey.FromCommand(builtCmd), descriptor);
                this.Log.LogTrace("Built Discord Application command: {Name}", builtCmd.Name);
            }

            // resolve client. Use scope to limit client's lifetime
            using IServiceScope scope = this.Services.CreateScope();
            IDiscordApplicationCommandsClient client = scope.ServiceProvider.GetRequiredService<IDiscordApplicationCommandsClient>();

            try
            {
                // register commands with the client
                this.Log.LogTrace("Sending Discord request to register {Count} commands", builtCommands.Count);
                IEnumerable<DiscordApplicationCommand> results;
                if (guildID != null)
                    results = await client.RegisterGuildCommandsAsync(guildID.Value, builtCommands, cancellationToken).ConfigureAwait(false);
                else
                    results = await client.RegisterGlobalCommandsAsync(builtCommands, cancellationToken).ConfigureAwait(false);

                // for each result, find mapped commands via name, and save descriptor
                foreach (DiscordApplicationCommand registeredCmd in results)
                {
                    ServiceDescriptor descriptor = commandNames[CommandKey.FromCommand(registeredCmd)];
                    this._factory.AddDescriptor(registeredCmd.ID, descriptor);
                    this.Log.LogDebug("Registered command {Name} with ID {ID}", registeredCmd.Name, registeredCmd.ID);
                }
            }
            catch (Exception ex) when (OnException(ex)) { }

            bool OnException(Exception exception)
            {
                OnCommandsRegistrationFailed(exception, builtCommands, guildID);
                return true;
            }
        }

        /// <summary>Called when there was an exception when registering commands.</summary>
        /// <remarks>By default, this method logs the exception as error, including Guild ID in the log message.</remarks>
        /// <param name="exception">Exception that has occured.</param>
        /// <param name="commands">Commands that were attempted to be registered.</param>
        /// <param name="guildID">ID of the guild where the commands were being registered. Null for global commands.</param>
        protected virtual void OnCommandsRegistrationFailed(Exception exception, IEnumerable<DiscordApplicationCommand> commands, ulong? guildID)
        {
            if (guildID == null)
                this.Log.LogError(exception, "Failed registering Discord Application commands");
            else
                this.Log.LogError(exception, "Failed registering Discord Application commands for guild ID {GuildID}", guildID);
        }

        /// <inheritdoc/>
        Task IHostedService.StopAsync(CancellationToken cancellationToken)
            => Task.CompletedTask;

        /// <summary>Compound key for Discord Application Command.</summary>
        /// <remarks>Until commands are actually registered with Discord Servers, their ID will be unknown. Name alone isn't good enough either, as commands with 
        /// same name can be of different type. This struct combines name and type into a single key that can be used in dictionaries during registration lookups.</remarks>
        private struct CommandKey : IEquatable<CommandKey>
        {
            public string Name { get; }
            public DiscordApplicationCommandType Type { get; }

            public CommandKey(string name, DiscordApplicationCommandType type)
            {
                this.Name = name;
                this.Type = type;
            }

            public bool Equals(CommandKey other)
                => this.Name.Equals(other.Name, StringComparison.OrdinalIgnoreCase) && this.Type == other.Type;

            public override bool Equals(object obj)
            {
                if (obj is CommandKey key)
                    return this.Equals(key);
                return false;
            }

            public override int GetHashCode()
                => HashCode.Combine(this.Name.GetHashCode(StringComparison.OrdinalIgnoreCase), Type);

            public static bool operator ==(CommandKey left, CommandKey right)
                => left.Equals(right);

            public static bool operator !=(CommandKey left, CommandKey right)
                => !(left == right);

            public static CommandKey FromCommand(DiscordApplicationCommand command)
                => new CommandKey(command.Name, command.Type);
        }
    }
}
