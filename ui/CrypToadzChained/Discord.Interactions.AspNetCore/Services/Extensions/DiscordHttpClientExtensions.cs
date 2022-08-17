using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions
{
    /// <summary>Extensions for <see cref="IDiscordHttpClient"/>.</summary>
    public static class DiscordHttpClientExtensions
    {
        /// <summary>Sends a request to Discord API.</summary>
        /// <param name="client">Client to send the request with.</param>
        /// <param name="method">HTTP Method.</param>
        /// <param name="relativeURL">URL relative to Discord API route to send the request to.</param>
        /// <param name="json">Contents of the request.</param>
        /// <param name="cancellationToken">Cancellation token that can be used to abort the request.</param>
        /// <returns>Discord server response.</returns>
        public static Task<HttpResponseMessage> SendJsonAsync(this IDiscordHttpClient client, HttpMethod method, string relativeURL, JToken json, CancellationToken cancellationToken = default)
        {
            if (json == null)
                return client.SendAsync(method, relativeURL, cancellationToken);

            string jsonContent = json.ToString(Newtonsoft.Json.Formatting.None);
            HttpContent content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            return client.SendAsync(method, relativeURL, content, cancellationToken);
        }

        /// <summary>Sends a request to Discord API.</summary>
        /// <param name="client">Client to send the request with.</param>
        /// <param name="method">HTTP Method.</param>
        /// <param name="relativeURL">URL relative to Discord API route to send the request to.</param>
        /// <param name="data">Contents of the request.</param>
        /// <param name="cancellationToken">Cancellation token that can be used to abort the request.</param>
        /// <returns>Discord server response.</returns>
        public static Task<HttpResponseMessage> SendJsonAsync(this IDiscordHttpClient client, HttpMethod method, string relativeURL, object data, CancellationToken cancellationToken = default)
        {
            if (data == null)
                return client.SendAsync(method, relativeURL, cancellationToken);

            if (!(data is JToken json))
                json = JToken.FromObject(data);
            return client.SendJsonAsync(method, relativeURL, json, cancellationToken);
        }

        /// <summary>Sends a request to Discord API.</summary>
        /// <param name="client">Client to send the request with.</param>
        /// <param name="method">HTTP Method.</param>
        /// <param name="relativeURL">URL relative to Discord API route to send the request to.</param>
        /// <param name="cancellationToken">Cancellation token that can be used to abort the request.</param>
        /// <returns>Discord server response.</returns>
        public static Task<HttpResponseMessage> SendAsync(this IDiscordHttpClient client, HttpMethod method, string relativeURL, CancellationToken cancellationToken = default)
            => client.SendAsync(method, relativeURL, (HttpContent)null, cancellationToken);
    }
}
