namespace CrypToadzChained.Shared;

public sealed class ParityError
{
    public string? Source { get; set; } = null!;
    public uint? TokenId { get; set; } = null!;
    public string? Category { get; set; } = null!;
    public string Message { get; set; } = null!;
}