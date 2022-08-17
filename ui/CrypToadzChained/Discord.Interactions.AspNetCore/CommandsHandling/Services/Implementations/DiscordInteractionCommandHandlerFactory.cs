using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace TehGM.Discord.Interactions.CommandsHandling.Services
{
    /// <inheritdoc/>
    public class DiscordInteractionCommandHandlerFactory : IDiscordInteractionCommandHandlerFactory
    {
        private readonly IDictionary<ulong, ServiceDescriptor> _descriptors
            = new Dictionary<ulong, ServiceDescriptor>();
        private readonly object _lock = new object();

        /// <inheritdoc/>
        public void AddDescriptor(ulong commandID, ServiceDescriptor handlerDescriptor)
        {
            if (handlerDescriptor == null)
                throw new ArgumentNullException(nameof(handlerDescriptor));

            lock (this._lock)
                this._descriptors.Add(commandID, handlerDescriptor);
        }

        /// <inheritdoc/>
        public IDiscordInteractionCommandHandler CreateHandler(ServiceDescriptor handlerDescriptor, IServiceProvider services)
        {
            if (handlerDescriptor == null)
                throw new ArgumentNullException(nameof(handlerDescriptor));
            if (services == null)
                throw new ArgumentNullException(nameof(services));


            object result = null;
            // try concrete instance first, if exists
            if (handlerDescriptor.ImplementationInstance != null)
                result = handlerDescriptor.ImplementationInstance;
            // 2nd pass, implementation factory
            else if (handlerDescriptor.ImplementationFactory != null)
                result = handlerDescriptor.ImplementationFactory(services);
            // last option, type + activator
            else if (handlerDescriptor.ServiceType != null)
                result = ActivatorUtilities.CreateInstance(services, handlerDescriptor.ServiceType);

            return result as IDiscordInteractionCommandHandler;
        }

        /// <inheritdoc/>
        public ServiceDescriptor GetDescriptor(ulong commandID)
        {
            lock (this._lock)
            {
                this._descriptors.TryGetValue(commandID, out ServiceDescriptor result);
                return result;
            }
        }

        /// <inheritdoc/>
        public bool RemoveDescriptor(ulong commandID)
        {
            lock (this._lock)
                return this._descriptors.Remove(commandID);
        }

        /// <inheritdoc/>
        public void Clear()
        {
            lock (this._lock)
                this._descriptors.Clear();
        }
    }
}
