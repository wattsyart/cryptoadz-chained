using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions.Services
{
    /// <inheritdoc/>
    public class DiscordApplicationCommandsClient : IDiscordApplicationCommandsClient
    {
        private readonly IDiscordHttpClient _client;
        private readonly DiscordInteractionsOptions _options;
        private readonly ILogger<DiscordApplicationCommandsClient> _logger;

        /// <summary>Creates a new instance of the client.</summary>
        /// <param name="client">Base Discord API HTTP client to use for making requests.</param>
        /// <param name="options">Discord interaction options with config for requests.</param>
        /// <param name="logger"></param>
        public DiscordApplicationCommandsClient(IDiscordHttpClient client, IOptions<DiscordInteractionsOptions> options, ILogger<DiscordApplicationCommandsClient> logger)
        {
            _client = client;
            _options = options.Value;
            _logger = logger;
        }

        /// <inheritdoc/>
        public Task<IEnumerable<DiscordApplicationCommand>> RegisterGlobalCommandsAsync(IEnumerable<DiscordApplicationCommand> commands, CancellationToken cancellationToken = default)
        {
            if (commands?.Any() != true)
                return Task.FromResult(Enumerable.Empty<DiscordApplicationCommand>());

            return this.SendAndParseAsync<IEnumerable<DiscordApplicationCommand>>(HttpMethod.Put, $"applications/{_options.ApplicationID}/commands", commands, cancellationToken);
        }

        /// <inheritdoc/>
        public Task<IEnumerable<DiscordApplicationCommand>> RegisterGuildCommandsAsync(ulong guildId, IEnumerable<DiscordApplicationCommand> commands, CancellationToken cancellationToken = default)
        {
            return commands?.Any() != true ? Task.FromResult(Enumerable.Empty<DiscordApplicationCommand>()) : SendAndParseAsync<IEnumerable<DiscordApplicationCommand>>(HttpMethod.Put, $"applications/{_options.ApplicationID}/guilds/{guildId}/commands", commands, cancellationToken);
        }

        private async Task<T> SendAndParseAsync<T>(HttpMethod method, string relativeUrl, object data, CancellationToken cancellationToken)
        {
            using var response = await _client.SendJsonAsync(method, relativeUrl, data, cancellationToken).ConfigureAwait(false);
            var body = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            if (!response.IsSuccessStatusCode && !string.IsNullOrWhiteSpace(body))
                _logger.LogError("Discord API Error Response: {Body}", body);
            var json = JToken.Parse(body);
            return json.ToObject<T>();
        }
    }
}
