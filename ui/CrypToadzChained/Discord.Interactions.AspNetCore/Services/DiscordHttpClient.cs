using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Discord.Interactions.AspNetCore.Services
{
    /// <inheritdoc/>
    public class DiscordHttpClient : IDiscordHttpClient
    {
        private readonly ILogger<DiscordHttpClient> _logger;

        public HttpClient Client { get; }

        private readonly DiscordInteractionsOptions _options;

        public DiscordHttpClient(HttpClient client, IOptionsSnapshot<DiscordInteractionsOptions> options, ILogger<DiscordHttpClient> logger)
        {
            _logger = logger;
            Client = client;
            _options = options.Value;
            Client.DefaultRequestHeaders.Add("User-Agent", _options.UserAgent);
            if (!string.IsNullOrWhiteSpace(_options.BearerToken))
                Client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_options.BearerToken}");
            else if (!string.IsNullOrWhiteSpace(_options.BotToken))
                Client.DefaultRequestHeaders.Add("Authorization", $"Bot {_options.BotToken}");
            else
                throw new ArgumentException($"Please provide either {nameof(DiscordInteractionsOptions.BearerToken)} or {nameof(DiscordInteractionsOptions.BotToken)}", nameof(options));
        }
        
        public async Task<HttpResponseMessage> SendAsync(HttpMethod method, string relativeUrl, HttpContent content, CancellationToken cancellationToken = default)
        {
            var url = $"{_options.BaseApiURL}{relativeUrl}";
            using var request = new HttpRequestMessage(method, url);
            if (content != null)
                request.Content = content;
            return await SendAsync(request, cancellationToken).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken = default)
        {
            var response = await Client.SendAsync(request, cancellationToken).ConfigureAwait(false);
            if (!response.IsSuccessStatusCode && response.Content != null)
            {
                var error = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                if (!string.IsNullOrWhiteSpace(error))
                    _logger.LogError("Discord API Error: {Error}", error);
            }
            response.EnsureSuccessStatusCode();
            return response;
        }
    }
}
