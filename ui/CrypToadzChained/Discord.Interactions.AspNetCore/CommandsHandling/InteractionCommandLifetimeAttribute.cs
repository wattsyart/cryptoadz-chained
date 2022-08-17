using System;
using Microsoft.Extensions.DependencyInjection;

namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Specifies lifetime of command handler.</summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class InteractionCommandLifetimeAttribute : Attribute
    {
        /// <summary>Specifies the default lifetime that's used when attribute is not present on the handler class.</summary>
        public const ServiceLifetime DefaultLifetime = ServiceLifetime.Scoped;

        /// <summary>The lifetime to use for the handler.</summary>
        public ServiceLifetime Lifetime { get; }

        /// <summary>Specifies lifetime of command handler.</summary>
        /// <param name="lifetime">The lifetime to use for the handler.</param>
        public InteractionCommandLifetimeAttribute(ServiceLifetime lifetime)
        {
            this.Lifetime = lifetime;
        }
    }
}
