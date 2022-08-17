using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace TehGM.Discord.Interactions.CommandsHandling.Registration.Services
{
    /// <inheritdoc/>
    public class DiscordInteractionCommandBuilder : IDiscordInteractionCommandBuilder
    {
        /// <summary>Services that can be used for invoking the build method.</summary>
        protected IServiceProvider Services { get; }

        /// <summary>Initializes a new instance of the class.</summary>
        /// <param name="services">Services that can be used for invoking the build method.</param>
        public DiscordInteractionCommandBuilder(IServiceProvider services)
        {
            this.Services = services;
        }

        /// <inheritdoc/>
        /// <summary>Builds the command by invoking method marked with <see cref="InteractionCommandBuilderAttribute"/> or using <see cref="InteractionCommandAttribute"/>.</summary>
        /// <param name="cancellationToken">Cancellation token that will be passed to the build method.</param>
        /// <param name="type">Handler type to look for attributes in.</param>
        public Task<DiscordApplicationCommand> BuildAsync(Type type, CancellationToken cancellationToken)
        {
            // try to use the builder method first
            // bind instance methods as well, to do validation for the user
            IEnumerable<MethodInfo> methods = type.GetMethods(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.Instance).Where(method =>
                !Attribute.IsDefined(method, typeof(CompilerGeneratedAttribute)) && Attribute.IsDefined(method, typeof(InteractionCommandBuilderAttribute)));
            if (methods.Any())
            {
                // only allow one method to be marked
                if (methods.Count() > 1)
                    throw new InvalidOperationException($"Command handler {type.FullName} cannot be built - only 1 method can be marked with {nameof(InteractionCommandBuilderAttribute)}.");
                MethodInfo method = methods.First();

                // disallow non-static
                if (!method.IsStatic)
                    throw new InvalidOperationException($"Command handler {type.FullName} cannot be built - only static methods can be marked with {nameof(InteractionCommandBuilderAttribute)}.");

                // check return type
                if (!IsAllowedReturnType(method.ReturnType))
                    throw new InvalidOperationException($"Command handler {type.FullName} cannot be built - only static methods returning {nameof(DiscordApplicationCommand)} or " +
                        $"{nameof(Task<DiscordApplicationCommand>)} can be marked with {nameof(InteractionCommandBuilderAttribute)}.");

                // build params
                object[] parameterValues = BuildMethodParameters(method, cancellationToken);

                // invoke method
                object result = method.Invoke(null, parameterValues);

                // finally, return the results
                return HandleMethodReturnValue(result, method);
            }
            // if builder method is not there, check attribute on class
            else
            {
                InteractionCommandAttribute commandAttribute = type.GetCustomAttribute<InteractionCommandAttribute>(inherit: true);
                if (commandAttribute == null)
                    throw new InvalidOperationException($"Command handler {type.FullName} cannot be built - {nameof(InteractionCommandAttribute)} not present.");
                return HandleClassAttribute(commandAttribute, type);
            }
        }

        private static object[] _emptyParams = new object[] { };
        private object[] BuildMethodParameters(MethodInfo method, CancellationToken cancellationToken)
        {
            ParameterInfo[] parameters = method.GetParameters();
            if (!parameters.Any())
                return _emptyParams;

            object[] results = new object[parameters.Length];
            for (int i = 0; i < parameters.Length; i++)
            {
                ParameterInfo parameter = parameters[i];
                if (TryResolveMethodParameter(parameter, cancellationToken, out object value))
                    results[i] = value;
                else if (parameter.HasDefaultValue)
                    results[i] = parameter.DefaultValue;
                else if (parameter.IsOptional)
                    results[i] = Type.Missing;
                else
                    throw new InvalidOperationException($"Unsupported param type: {parameter.ParameterType.FullName}");
            }

            return results;
        }

        /// <summary>Resolves value or instance for a method parameter.</summary>
        /// <param name="parameter">Parameter to resolve instance for.</param>
        /// <param name="cancellationToken">Cancellation token that can be used to resolve CancellationToken parameters.</param>
        /// <param name="result">The resolved value.</param>
        /// <returns>True if parameter value could be resolved; otherwise false.</returns>
        protected virtual bool TryResolveMethodParameter(ParameterInfo parameter, CancellationToken cancellationToken, out object result)
        {
            // try from service provider first
            object service = this.Services.GetService(parameter.ParameterType);
            if (service != null)
            {
                result = service;
                return true;
            }

            // try service provider itself
            if (parameter.ParameterType.IsAssignableFrom(this.Services.GetType()))
            {
                result = this.Services;
                return true;
            }

            // try cancellation token
            if (parameter.ParameterType.IsAssignableFrom(typeof(CancellationToken)))
            {
                result = cancellationToken;
                return true;
            }

            result = default;
            return false;
        }

        /// <summary>Determines if the build method is allowed to return given type.</summary>
        /// <param name="type">Return type of the build method.</param>
        /// <returns>True if return type is allowed for build method; otherwise false.</returns>
        protected virtual bool IsAllowedReturnType(Type type)
            => typeof(DiscordApplicationCommand).IsAssignableFrom(type)
            || typeof(Task<DiscordApplicationCommand>).IsAssignableFrom(type);

        /// <summary>Handles/converts the value returned by the invoked build method.</summary>
        /// <param name="returnedValue">The value returned by the method.</param>
        /// <param name="method">The method info.</param>
        /// <returns>Method's return value converted to <see cref="DiscordApplicationCommand"/>.</returns>
        protected virtual async Task<DiscordApplicationCommand> HandleMethodReturnValue(object returnedValue, MethodInfo method)
        {
            object result = returnedValue;

            // if it's a task, await it
            if (result is Task<DiscordApplicationCommand> taskResult)
                result = await taskResult.ConfigureAwait(false);

            return (DiscordApplicationCommand)result;
        }

        /// <summary>Builds command from the attribute on the class.</summary>
        /// <param name="attribute">Attribute found on the class.</param>
        /// <param name="classType">The type of the class</param>
        /// <returns>Built command.</returns>
        protected virtual Task<DiscordApplicationCommand> HandleClassAttribute(InteractionCommandAttribute attribute, Type classType)
            => Task.FromResult(new DiscordApplicationCommand(attribute.CommandType, attribute.Name, attribute.Description, true));
    }
}
