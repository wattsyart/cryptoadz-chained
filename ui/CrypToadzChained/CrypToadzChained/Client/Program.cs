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
    // contract address for the on-chain project
    o.ContractAddress = "0x4190aC5bc2499dC0285AC344F92c6E87dF99f93A";
    
    // hide URLs in UI for sharing purposes
    o.HideSensitiveFields = false;

    // RPC URL pointing to the on-chain project
    o.RpcUrl = null!;

    // RPC URL pointing to mainnet (used in parity testing)
    o.MainNetRpcUrl = null!;
    
    // IPFS gateway URL (used in parity testing)
    o.IpfsUrl = null!;
});

await builder.Build().RunAsync();
