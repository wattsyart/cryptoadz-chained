using System;
using System.Threading.Tasks;

namespace TehGM.Discord.Interactions.AspNetCore.Authentication
{
    /// <summary>Allows subscribing to events raised during Discord Interactions authentication.</summary>
    public class DiscordInteractionsAuthenticationEvents
    {
        /// <summary>Invoked when <see cref="DiscordInteractionsAuthenticationHandler"/> has finished parsing claims and is about to create the authentication ticket.</summary>
        public Func<CreatingTicketContext, Task> OnCreatingTicket { get; set; } = _ => Task.CompletedTask;

        /// <summary>Invoked when <see cref="DiscordInteractionsAuthenticationHandler"/> has finished parsing claims and is about to create the authentication ticket.</summary>
        public virtual Task CreatingTicket(CreatingTicketContext context) => this.OnCreatingTicket?.Invoke(context);
    }
}
