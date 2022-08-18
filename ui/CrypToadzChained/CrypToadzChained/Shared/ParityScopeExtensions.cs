using System.ComponentModel;

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
            ParityScope.Generated => LUT.AllTokenIds.Except(LUT.CustomImageTokenIds).Except(LUT.CustomAnimationTokenIds),
            ParityScope.Custom => LUT.CustomImageTokenIds.Concat(LUT.CustomAnimationTokenIds),
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

    public static ParityScope Scope(this uint tokenId)
    {
        if (ParityScope.SmallCustomAnimations.TokenIds().Contains(tokenId))
            return ParityScope.SmallCustomAnimations;

        if (ParityScope.LargeCustomAnimations.TokenIds().Contains(tokenId))
            return ParityScope.LargeCustomAnimations;

        if (ParityScope.LargeCustomImages.TokenIds().Contains(tokenId))
            return ParityScope.LargeCustomImages;

        if (ParityScope.SmallCustomImages.TokenIds().Contains(tokenId))
            return ParityScope.SmallCustomImages;

        if (ParityScope.Generated.TokenIds().Contains(tokenId))
            return ParityScope.Generated;

        throw new ArgumentOutOfRangeException($"{tokenId} has no scope");
    }

    public static bool IsLargeImage(this uint tokenId) => ParityScope.LargeCustomAnimations.TokenIds().Contains(tokenId) || ParityScope.LargeCustomImages.TokenIds().Contains(tokenId);

    public static bool IsLargeImage(this ulong tokenId)
    {
        if (tokenId > uint.MaxValue)
            return false;

        var id = (uint) tokenId;

        return IsLargeImage(id);
    }
}