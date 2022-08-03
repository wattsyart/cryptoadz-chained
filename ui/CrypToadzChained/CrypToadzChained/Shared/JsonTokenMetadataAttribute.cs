using System.Text.Json.Serialization;

namespace CrypToadzChained.Shared;

public sealed class JsonTokenMetadataAttribute
{
    [JsonPropertyName("trait_type")]
    public string? TraitType { get; set; }

    [JsonPropertyName("value")]
    public object? Value { get; set; }
}