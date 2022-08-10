using BlazorTable;
using CrypToadzChained.Client;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddBlazorTable();

#if DEBUG
builder.Services.AddScoped(_ => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
#else
builder.Services.AddScoped(_ => new HttpClient { BaseAddress = new Uri("https://cryptoadzchained.com") });
#endif

builder.Services.Configure<Web3Options>(o =>
{
    // RPC URL pointing to the on-chain project
    o.OnChainRpcUrl = null!;

    // contract address for the on-chain project
    o.OnChainContractAddress = "0x3aA95802dF552896040F063d05CEF7A436fF05e2";
    
    // contract address for mainnet project
    o.MainnetContractAddress = "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6";

    // RPC URL pointing to mainnet (used in parity testing)
    o.MainnetRpcUrl = null!;
    
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
