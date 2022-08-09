namespace CrypToadzChained.Shared;

public static class ParityErrorExtensions
{
    public static void Add(this IList<ParityError> errors, string source, uint tokenId, string category, string message)
    {
        errors.Add(new ParityError { Source = source, TokenId = tokenId, Category = category, Message = message });
    }
}