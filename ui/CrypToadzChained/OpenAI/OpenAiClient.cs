using Microsoft.Extensions.Logging;
using OpenAI.V1;

namespace OpenAI;

/// <summary>
/// See: https://platform.openai.com/docs/api-reference
/// </summary>
public sealed class OpenAiClient
{
    public OpenAiClient(HttpClient http, string apiKey, ILogger? logger)
    {
        V1 = new Version1(http, apiKey, logger);
    }

    public Version1 V1 { get; }
}