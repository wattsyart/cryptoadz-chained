using System.ComponentModel;

namespace CrypToadzChained.Shared;

public enum ParitySource
{
    [Description("Current BaseURI (Arweave)")]
    Arweave,
    [Description("Provenance CID (IPFS)")]
    Provenance
}