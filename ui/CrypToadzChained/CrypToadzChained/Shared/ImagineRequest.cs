using System.ComponentModel.DataAnnotations;

namespace CrypToadzChained.Shared;

public sealed class ImagineRequest
{
    [Required] public string Prompt { get; set; } = "Imagine a funny toad";
}