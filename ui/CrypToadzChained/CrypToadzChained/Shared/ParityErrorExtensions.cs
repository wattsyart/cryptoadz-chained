namespace CrypToadzChained.Shared;

public static class ParityErrorExtensions
{
    public static void Add(this IList<ParityError> errors, string message)
    {
        errors.Add(new ParityError { Message = message });
    }
}