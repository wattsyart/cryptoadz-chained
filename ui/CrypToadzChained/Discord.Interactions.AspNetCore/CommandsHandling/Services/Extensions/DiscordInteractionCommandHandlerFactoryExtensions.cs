using System;
using Microsoft.Extensions.DependencyInjection;

namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Extension methods for <see cref="IDiscordInteractionCommandHandlerFactory"/>.</summary>
    public static class DiscordInteractionCommandHandlerFactoryExtensions
    {
        /// <summary>Adds an already created command handler instance for a specific command ID.</summary>
        /// <param name="factory">Handler factory to add the handler to.</param>
        /// <param name="commandID">ID of the command.</param>
        /// <param name="instance">Instance of the handler to add.</param>
        public static void AddSingletonCommand(this IDiscordInteractionCommandHandlerFactory factory, ulong commandID, IDiscordInteractionCommandHandler instance)
            => factory.AddDescriptor(commandID, ServiceDescriptor.Singleton(instance.GetType(), instance));
        /// <summary>Adds a new command service descriptor for a specific command ID, with singleton lifetime.</summary>
        /// <param name="factory">Handler factory to add the handler descriptor to.</param>
        /// <param name="commandID">ID of the command.</param>
        /// <typeparam name="THandler">Type of the handler to register as a new descriptor.</typeparam>
        public static void AddSingletonCommand<THandler>(this IDiscordInteractionCommandHandlerFactory factory, ulong commandID) where THandler : class, IDiscordInteractionCommandHandler
            => factory.AddDescriptor(commandID, ServiceDescriptor.Singleton<THandler, THandler>());

        /// <summary>Adds a new command service descriptor for a specific command ID, with scoped lifetime.</summary>
        /// <param name="factory">Handler factory to add the handler descriptor to.</param>
        /// <param name="commandID">ID of the command.</param>
        /// <typeparam name="THandler">Type of the handler to register as a new descriptor.</typeparam>
        public static void AddScopedCommand<THandler>(this IDiscordInteractionCommandHandlerFactory factory, ulong commandID) where THandler : class, IDiscordInteractionCommandHandler
            => factory.AddDescriptor(commandID, ServiceDescriptor.Scoped<THandler, THandler>());

        /// <summary>Adds a new command service descriptor for a specific command ID, with transient lifetime.</summary>
        /// <param name="factory">Handler factory to add the handler descriptor to.</param>
        /// <param name="commandID">ID of the command.</param>
        /// <typeparam name="THandler">Type of the handler to register as a new descriptor.</typeparam>
        public static void AddTransientCommand<THandler>(this IDiscordInteractionCommandHandlerFactory factory, ulong commandID) where THandler : class, IDiscordInteractionCommandHandler
            => factory.AddDescriptor(commandID, ServiceDescriptor.Transient<THandler, THandler>());

        /// <summary>Creates an instance of a command handler from command ID. A descriptor for this ID must be already added.</summary>
        /// <param name="factory">Handler factory to create the command handler with.</param>
        /// <param name="commandID">ID of the command.</param>
        /// <param name="services">Service provider to use for creating the handler isntance.</param>
        /// <returns>Created handler instance if provided ID was found; otherwise null.</returns>
        public static IDiscordInteractionCommandHandler CreateHandler(this IDiscordInteractionCommandHandlerFactory factory, ulong commandID, IServiceProvider services)
        {
            ServiceDescriptor descriptor = factory.GetDescriptor(commandID);
            if (descriptor == null)
                return null;
            return factory.CreateHandler(descriptor, services);
        }
    }
}
