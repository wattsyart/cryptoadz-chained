namespace CrypToadzChained.Shared;

public sealed class ParityStateRow
{
    public uint TokenId { get; set; }
    public string? SourceImageUri { get; set; }
    public string? TargetImageUri { get; set; }
    public string? DeltaImageUri { get; set; }
}