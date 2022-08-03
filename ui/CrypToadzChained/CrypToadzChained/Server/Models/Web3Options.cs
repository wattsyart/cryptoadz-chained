using System.ComponentModel.DataAnnotations;

namespace CrypToadzChained.Server.Models
{
    public sealed class Web3Options
    {
        [Required] public string Url { get; set; } = null!;
        [Required] public string ContractAddress { get; set; } = null!;
    }
}
