namespace CrypToadzChained.Server.Models;

public sealed class GameSession
{
    public int Id { get; set; }
    public int Index { get; set; }
    public string? Winner { get; set; }
}