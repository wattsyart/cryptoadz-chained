using CrypToadzChained.Shared;
using Microsoft.Extensions.DependencyInjection;
using TehGM.Discord.Interactions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.Configure<Web3Options>(builder.Configuration.GetSection("Web3"));

builder.Services.AddDiscordInteractions(o => { o.RegisterCommands = true; });
builder.Services.Configure<DiscordInteractionsOptions>(builder.Configuration.GetSection("Discord"));


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();
app.UseDiscordInteractions();

app.UseRouting();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
