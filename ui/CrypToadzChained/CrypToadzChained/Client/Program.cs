using BlazorTable;
using CrypToadzChained.Client;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddBlazorTable();
builder.Services.AddScoped(_ => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.Configure<Web3Options>(o =>
{
    // RPC URL pointing to the on-chain project
    o.OnChainRpcUrl = null!;

    // contract address for the on-chain project
    o.OnChainContractAddress = "0xE8D8C0A6f174e08C44aB399b7CE810Bc4Dce096A";
    
    // contract address for mainnet project
    o.SourceContractAddress = "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6";

    // RPC URL pointing to mainnet (used in parity testing)
    o.SourceRpcUrl = null!;
    
    // IPFS CID (used in parity testing)
    o.IpfsCid = "QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr";

    // IPFS gateway URL (used in parity testing)
    o.IpfsUrl = null!;

    // IPFS username (used in parity testing, optional)
    o.IpfsUsername = null!;

    // IPFS password (used in parity testing, optional)
    o.IpfsPassword = null!;

    // hide URLs in UI for sharing purposes
    o.HideSensitiveFields = false;
});

await builder.Build().RunAsync();
