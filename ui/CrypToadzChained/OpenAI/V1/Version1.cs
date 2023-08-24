using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using OpenAI.V1.Chat;

namespace OpenAI.V1;

public sealed class Version1
{
    public Version1(HttpClient http, string apiKey, ILogger? logger)
    {
        http.BaseAddress = new Uri("https://api.openai.com/v1/", UriKind.Absolute);
        http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
        options.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
        options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

        Chat = new ChatV1(http, options, logger);
    }
    
    public ChatV1 Chat { get; }
}