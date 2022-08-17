using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace TehGM.Discord.Interactions
{
    /// <summary>A base client for Discord API operations.</summary>
    public interface IDiscordHttpClient
    {
        /// <summary>Sends a request to Discord API.</summary>
        /// <param name="method">HTTP Method.</param>
        /// <param name="relativeURL">URL relative to Discord API route to send the request to.</param>
        /// <param name="content">Contents of the request.</param>
        /// <param name="cancellationToken">Cancellation token that can be used to abort the request.</param>
        /// <returns>Discord server response.</returns>
        Task<HttpResponseMessage> SendAsync(HttpMethod method, string relativeURL, HttpContent content, CancellationToken cancellationToken = default);
        /// <summary>Sends a request to Discord API.</summary>
        /// <param name="request">The request message.</param>
        /// <param name="cancellationToken">Cancellation token that can be used to abort the request.</param>
        /// <returns>Discord server response.</returns>
        Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken = default);
    }
}
