using System.Text.Json.Serialization;

namespace CrypToadzChained.Shared;

public sealed class JsonTokenMetadata
{
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("external_url")]
    public string? ExternalUrl { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("image")]
    public string? Image { get; set; }

    [JsonPropertyName("image_data")]
    public string? ImageData { get; set; }

    [JsonPropertyName("attributes")]
    public List<JsonTokenMetadataAttribute> Attributes { get; set; } = new();
}