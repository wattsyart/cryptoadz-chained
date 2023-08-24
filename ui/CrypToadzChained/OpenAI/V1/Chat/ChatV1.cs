using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace OpenAI.V1.Chat
{
    public sealed class ChatV1
    {
        private readonly HttpClient _http;
        private readonly ILogger? _logger;
        private readonly JsonSerializerOptions _options;

        public ChatV1(HttpClient http, JsonSerializerOptions options, ILogger? logger)
        {
            _http = http;
            _logger = logger;
            _options = options;
        }

        /// <summary>
        /// See: https://platform.openai.com/docs/api-reference/chat/create
        /// </summary>
        public async Task<ChatResponse> CreateAsync(IList<ChatMessage> messages, int maxTokens)
        {
            var request = new ChatRequest
            {
                Model = "gpt-4",
                Messages = messages,
                MaxTokens = maxTokens
            };

            var json = JsonSerializer.Serialize(request, _options);

            _logger?.LogInformation("Request: {Body}", json);

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _http.PostAsync("chat/completions", content);
            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                _logger?.LogInformation("Response: {Body}", body);
                var completion = JsonSerializer.Deserialize<ChatResponse>(body, _options)!;
                return completion;
            }
            else
            {
                var error = await response.Content.ReadAsStringAsync();
                _logger?.LogInformation("Response: {Error}", error);
                var completion = new ChatResponse
                {
                    Choices = new List<ChatChoice>
                    {
                        new()
                        {
                            Index = 0,
                            Message = new ChatMessage
                            {
                                Content = error,
                                Role = ChatRole.System,
                            }
                        }
                    },
                    Usage = new Usage()
                };
                return completion;
            }
        }
    }
}
