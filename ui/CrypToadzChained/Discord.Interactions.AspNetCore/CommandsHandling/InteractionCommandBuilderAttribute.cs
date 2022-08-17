using System;
using System.Threading;
using System.Threading.Tasks;

namespace TehGM.Discord.Interactions.CommandsHandling
{
    /// <summary>Marks the method to build Application Command with. The method needs to be static, return <see cref="DiscordApplicationCommand"/>, 
    /// enumerable of <see cref="DiscordApplicationCommand"/> or a <see cref="Task"/> returning either of these, and can take <see cref="IServiceProvider"/> and <see cref="CancellationToken"/> as its argument.</summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
    public class InteractionCommandBuilderAttribute : Attribute { }
}
