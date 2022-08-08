namespace CrypToadzChained.Shared;

public sealed class ParityOptions
{
    public ParitySource Source { get; set; }
    public ParityScope Scope { get; set; }
    public bool ContinueOnError { get; set; } = true;
}