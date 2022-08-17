using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace TehGM.Discord.Interactions.Services
{
    /// <inheritdoc/>
    public class DiscordApplicationCommandsClient : IDiscordApplicationCommandsClient
    {
        private readonly IDiscordHttpClient _client;
        private readonly DiscordInteractionsOptions _options;

        /// <summary>Creates a new instance of the client.</summary>
        /// <param name="client">Base Discord API HTTP client to use for making requests.</param>
        /// <param name="options">Discord interaction options with config for requests.</param>
        public DiscordApplicationCommandsClient(IDiscordHttpClient client, IOptionsSnapshot<DiscordInteractionsOptions> options)
        {
            this._client = client;
            this._options = options.Value;
        }

        /// <inheritdoc/>
        public Task<IEnumerable<DiscordApplicationCommand>> RegisterGlobalCommandsAsync(IEnumerable<DiscordApplicationCommand> commands, CancellationToken cancellationToken = default)
        {
            if (commands?.Any() != true)
                return Task.FromResult(Enumerable.Empty<DiscordApplicationCommand>());

            return this.SendAndParseAsync<IEnumerable<DiscordApplicationCommand>>(HttpMethod.Put, $"applications/{this._options.ApplicationID}/commands", commands, cancellationToken);
        }

        /// <inheritdoc/>
        public Task<IEnumerable<DiscordApplicationCommand>> RegisterGuildCommandsAsync(ulong guildID, IEnumerable<DiscordApplicationCommand> commands, CancellationToken cancellationToken = default)
        {
            if (commands?.Any() != true)
                return Task.FromResult(Enumerable.Empty<DiscordApplicationCommand>());

            return this.SendAndParseAsync<IEnumerable<DiscordApplicationCommand>>(HttpMethod.Put, $"applications/{this._options.ApplicationID}/guilds/{guildID}/commands", commands, cancellationToken);
        }

        private async Task<T> SendAndParseAsync<T>(HttpMethod method, string relativeURL, object data, CancellationToken cancellationToken)
        {
            using HttpResponseMessage response = await this._client.SendJsonAsync(method, relativeURL, data, cancellationToken).ConfigureAwait(false);
            string body = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            JToken json = JToken.Parse(body);
            return json.ToObject<T>();
        }
    }
}
