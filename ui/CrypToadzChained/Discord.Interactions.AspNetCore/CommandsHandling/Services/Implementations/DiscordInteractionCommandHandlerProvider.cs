using System;
using Microsoft.Extensions.DependencyInjection;

namespace TehGM.Discord.Interactions.CommandsHandling.Services
{
    /// <inheritdoc/>
    /// <remarks>This class should be registered as scoped, so it can effectively resolve scoped services. 
    /// To resolve singleton ones, it uses singleton cache <see cref="DiscordInteractionCommandHandlerCache"/>.</remarks>
    public class DiscordInteractionCommandHandlerProvider : IDiscordInteractionCommandHandlerProvider, IDisposable
    {
        private readonly DiscordInteractionCommandHandlerCache _singletonHandlers;
        private readonly DiscordInteractionCommandHandlerCache _scopedHandlers;
        private readonly IDiscordInteractionCommandHandlerFactory _factory;
        private readonly IServiceProvider _services;
        private readonly object _lock = new object();

        /// <summary>Initializes a new provider for the scope.</summary>
        /// <param name="services">Services provider for creating command handler instances that have non-singleton lifetime.</param>
        /// <param name="factory">Handler factory for creating command handler instances.</param>
        /// <param name="singletonHandlers">Cache of singleton-lifetime hand;ers.</param>
        public DiscordInteractionCommandHandlerProvider(IServiceProvider services, IDiscordInteractionCommandHandlerFactory factory, DiscordInteractionCommandHandlerCache singletonHandlers)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            if (factory == null)
                throw new ArgumentNullException(nameof(factory));
            if (singletonHandlers == null)
                throw new ArgumentNullException(nameof(singletonHandlers));

            this._services = services;
            this._factory = factory;
            this._singletonHandlers = singletonHandlers;
            this._scopedHandlers = new DiscordInteractionCommandHandlerCache(services);
        }

        /// <inheritdoc/>
        public IDiscordInteractionCommandHandler GetHandler(ulong commandID)
        {
            lock (this._lock)
            {
                ServiceDescriptor descriptor = this._factory.GetDescriptor(commandID);
                if (descriptor == null)
                    return null;

                // transient services - simplest case. Just create and return
                if (descriptor.Lifetime == ServiceLifetime.Transient)
                    return this._factory.CreateHandler(descriptor, this._services);
                // scoped services - check cache first, otherwise create, cache and return
                if (descriptor.Lifetime == ServiceLifetime.Scoped)
                    return this.GetOrCreateHandler(commandID, descriptor, this._scopedHandlers);
                // singleton services - similar to scoped ones, but use singleton cache instead of local scoped one
                if (descriptor.Lifetime == ServiceLifetime.Singleton)
                    return this.GetOrCreateHandler(commandID, descriptor, this._singletonHandlers);

                throw new InvalidOperationException($"Service lifetime {descriptor.Lifetime} is not supported.");
            }
        }

        private IDiscordInteractionCommandHandler GetOrCreateHandler(ulong commandID, ServiceDescriptor descriptor, DiscordInteractionCommandHandlerCache cache)
        {
            if (cache == null)
                throw new ArgumentNullException(nameof(cache));

            if (cache.TryGetValue(commandID, out IDiscordInteractionCommandHandler result))
                return result;
            result = this._factory.CreateHandler(descriptor, cache.Services);
            if (result != null)
                cache.Add(commandID, result);
            return result;
        }

        /// <summary>Disposes all scoped commands handled by this provider.</summary>
        public void Dispose()
        {
            lock (this._lock)
                this._scopedHandlers?.Dispose();
        }
    }
}
