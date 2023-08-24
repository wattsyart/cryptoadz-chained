using System.Text.Json.Serialization;

namespace OpenAI.V1.Chat;

public sealed class ChatRequest
{
    [JsonPropertyName("model")]
    public string? Model { get; set; }

    [JsonPropertyName("messages")]
    public IList<ChatMessage> Messages { get; set; } = new List<ChatMessage>();

    [JsonPropertyName("temperature")]
    public float? Temperature { get; set; }

    [JsonPropertyName("top_p")]
    public float? TopProbabilityMass { get; set; }

    [JsonPropertyName("n")]
    public int? Count { get; set; }

    [JsonPropertyName("stream")]
    public bool? Stream { get; set; }

    [JsonPropertyName("stop")]
    public List<string>? StopSequences { get; set; }

    [JsonPropertyName("max_tokens")]
    public int? MaxTokens { get; set; }

    [JsonPropertyName("logit_bias")]
    public int? LogitBias { get; set; }

    [JsonPropertyName("user")]
    public string? User { get; set; }
}