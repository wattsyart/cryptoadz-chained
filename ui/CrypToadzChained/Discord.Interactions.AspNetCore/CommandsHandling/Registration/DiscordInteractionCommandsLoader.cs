using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using Microsoft.Extensions.Logging;

namespace TehGM.Discord.Interactions.CommandsHandling.Registration.Services
{
    class DiscordInteractionCommandsLoader : IDiscordInteractionCommandsLoader
    {
        private readonly ILogger _log;

        public DiscordInteractionCommandsLoader(ILogger<DiscordInteractionCommandsLoader> log)
        {
            this._log = log;
        }

        public IEnumerable<TypeInfo> LoadFromAssembly(Assembly assembly)
        {
            _log?.LogTrace("Loading assembly {Name}", assembly.FullName);
            IEnumerable<TypeInfo> types = assembly.DefinedTypes.Where(t => !t.IsAbstract && !t.ContainsGenericParameters
                && !Attribute.IsDefined(t, typeof(CompilerGeneratedAttribute)) && typeof(IDiscordInteractionCommandHandler).IsAssignableFrom(t));
            if (!types.Any())
            {
                _log?.LogWarning("Cannot load command handlers from assembly {Name} - no non-static non-abstract non-generic classes implementing {Type} interface", assembly.FullName, nameof(IDiscordInteractionCommandHandler));
                return Enumerable.Empty<TypeInfo>();
            }

            return types;
        }
    }
}
