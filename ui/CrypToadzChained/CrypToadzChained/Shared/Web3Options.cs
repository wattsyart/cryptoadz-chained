using System.ComponentModel.DataAnnotations;

namespace CrypToadzChained.Shared
{
    public sealed class Web3Options
    {
        [Required] public string OnChainRpcUrl { get; set; } = null!;
        [Required] public string OnChainContractAddress { get; set; } = null!;

        [Required] public string SourceRpcUrl { get; set; } = null!;
        [Required] public string SourceContractAddress { get; set; } = null!;

        public string? IpfsCid { get; set; }
        public string? IpfsUrl { get; set; }
        public string? IpfsUsername { get; set; }
        public string? IpfsPassword { get; set; }
        
        public bool HideSensitiveFields { get; set; }
    }
}
