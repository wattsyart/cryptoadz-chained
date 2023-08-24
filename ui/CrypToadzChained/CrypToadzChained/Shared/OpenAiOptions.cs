using System.ComponentModel.DataAnnotations;

namespace CrypToadzChained.Shared;

public sealed class OpenAiOptions
{
    [Required]
    public string ApiKey { get; set; } = null!;
}