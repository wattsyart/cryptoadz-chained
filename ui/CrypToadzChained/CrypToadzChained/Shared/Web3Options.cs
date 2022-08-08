using System.ComponentModel.DataAnnotations;

namespace CrypToadzChained.Shared
{
    public sealed class Web3Options
    {
        [Required] public string RpcUrl { get; set; } = null!;
        [Required] public string MainNetRpcUrl { get; set; } = null!;
        [Required] public string IpfsUrl { get; set; } = null!;
        [Required] public string ContractAddress { get; set; } = null!;
        [Required] public bool HideSensitiveFields { get; set; }
    }
}
