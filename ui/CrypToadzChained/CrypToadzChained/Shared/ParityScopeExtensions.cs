namespace CrypToadzChained.Shared;

public static class ParityScopeExtensions
{
    public static uint Count(this ParityScope scope)
    {
        return (uint) TokenIds(scope).Count();
    }

    public static IEnumerable<uint> TokenIds(this ParityScope scope)
    {
        var tokenIds = scope switch
        {
            ParityScope.All => LUT.AllTokenIds,
            ParityScope.AllGenerated => LUT.AllTokenIds.Except(LUT.CustomImageTokenIds).Except(LUT.CustomAnimationTokenIds),
            ParityScope.AllCustoms => LUT.CustomImageTokenIds.Concat(LUT.CustomAnimationTokenIds),
            ParityScope.CustomImages => LUT.CustomImageTokenIds,
            ParityScope.SmallCustomImages => LUT.CustomImageTokenIds.Except(LUT.LargeImageTokenIds),
            ParityScope.LargeCustomImages => LUT.LargeImageTokenIds,
            ParityScope.CustomAnimations => LUT.CustomAnimationTokenIds,
            ParityScope.LargeCustomAnimations => LUT.LargeAnimationTokenIds,
            ParityScope.SmallCustomAnimations => LUT.CustomAnimationTokenIds.Except(LUT.LargeAnimationTokenIds),
            _ => throw new ArgumentOutOfRangeException()
        };

        return tokenIds;
    }
}