using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace TehGM.Discord.Interactions.Services
{
    /// <inheritdoc/>
    public class DiscordHttpClient : IDiscordHttpClient
    {
        /// <summary>Underlying HTTP client.</summary>
        public HttpClient Client { get; }

        private readonly DiscordInteractionsOptions _options;

        /// <summary>Creates a new instance of the HTTP Client wrapper.</summary>
        /// <param name="client">Base HTTP client.</param>
        /// <param name="options">Discord interaction options with config for requests.</param>
        public DiscordHttpClient(HttpClient client, IOptionsSnapshot<DiscordInteractionsOptions> options)
        {
            this.Client = client;
            this._options = options.Value;

            this.Client.DefaultRequestHeaders.Add("User-Agent", this._options.UserAgent);
            if (!string.IsNullOrWhiteSpace(this._options.BearerToken))
                this.Client.DefaultRequestHeaders.Add("Authorization", $"Bearer {this._options.BearerToken}");
            else if (!string.IsNullOrWhiteSpace(this._options.BotToken))
                this.Client.DefaultRequestHeaders.Add("Authorization", $"Bot {this._options.BotToken}");
            else
                throw new ArgumentException($"Please provide either {nameof(DiscordInteractionsOptions.BearerToken)} or {nameof(DiscordInteractionsOptions.BotToken)}", nameof(options));
        }

        /// <inheritdoc/>
        public async Task<HttpResponseMessage> SendAsync(HttpMethod method, string relativeURL, HttpContent content, CancellationToken cancellationToken = default)
        {
            string url = $"{this._options.BaseApiURL}/{relativeURL}";
            using HttpRequestMessage request = new HttpRequestMessage(method, url);
            if (content != null)
                request.Content = content;
            return await this.SendAsync(request, cancellationToken).ConfigureAwait(false);
        }

        /// <inheritdoc/>
        public async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken = default)
        {
            HttpResponseMessage response = await this.Client.SendAsync(request, cancellationToken).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
            return response;
        }
    }
}
