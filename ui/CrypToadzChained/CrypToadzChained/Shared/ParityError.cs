namespace CrypToadzChained.Shared;

public sealed class ParityError
{
    public uint? TokenId { get; set; } = null!;
    public string Message { get; set; } = null!;
}