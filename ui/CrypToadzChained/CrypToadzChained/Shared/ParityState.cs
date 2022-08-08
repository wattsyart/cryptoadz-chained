namespace CrypToadzChained.Shared;

public sealed class ParityState
{
    public List<ParityStateRow> Rows { get; set; } = new();
    public List<ParityError> Errors { get; set; } = new();
}