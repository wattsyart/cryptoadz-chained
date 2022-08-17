using System;
using System.Collections.Generic;
using System.Linq;

namespace TehGM.Discord.Interactions.CommandsHandling.Services
{
    /// <summary>Caches interaction command handlers.</summary>
    /// <remarks><para>This service is designed to be a part of <see cref="DiscordInteractionCommandHandlerProvider"/>.
    /// The provider itself needs to be a scoped service, so it can work with scoped handlers properly. This service is a component for storing singleton instances.</para>
    /// <para>This service is also used for scoped handlers, but created in the scoped provider, and not registered as a service.</para></remarks>
    public class DiscordInteractionCommandHandlerCache : Dictionary<ulong, IDiscordInteractionCommandHandler>, IDisposable
    {
        private readonly object _lock = new object();

        /// <summary>Root-scope level service provider that can be used for creation of handlers.</summary>
        public IServiceProvider Services { get; }

        /// <summary>Creates a new instance of the cache.</summary>
        /// <param name="services">Root-scope level service provider that can be used for creation of handlers.</param>
        public DiscordInteractionCommandHandlerCache(IServiceProvider services)
        {
            this.Services = services;
        }

        /// <inheritdoc/>
        public void Dispose()
        {
            lock (this._lock)
            {
                IEnumerable<IDisposable> disposables = this.Values.Where(handler => handler is IDisposable).Cast<IDisposable>();
                foreach (IDisposable cmd in disposables)
                    try { cmd?.Dispose(); } catch { }
                this.Clear();
            }
        }
    }
}
