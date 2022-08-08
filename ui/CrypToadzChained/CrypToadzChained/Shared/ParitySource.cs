using System.ComponentModel;

namespace CrypToadzChained.Shared;

public enum ParitySource
{
    [Description("Current BaseURI (Arweave)")]
    Current,
    [Description("Provenance CID (IPFS)")]
    Provenance
}