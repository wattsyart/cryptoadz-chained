using System;

namespace Discord.Interactions.AspNetCore.CommandsHandling
{
    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    public sealed class InteractionCommandBuilderAttribute : Attribute { }
}
