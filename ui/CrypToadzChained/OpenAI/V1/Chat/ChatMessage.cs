using System.Text.Json.Serialization;

namespace OpenAI.V1.Chat;

public sealed class ChatMessage
{
    [JsonPropertyName("role")]
    public ChatRole? Role { get; set; }

    [JsonPropertyName("content")]
    public string? Content { get; set; }
}

