using CrypToadzChained.Shared;
using Discord.Interactions.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<Web3Options>(builder.Configuration.GetSection("Web3"));
builder.Services.Configure<DiscordInteractionsOptions>(builder.Configuration.GetSection("Discord"));
builder.Services.Configure<OpenAiOptions>(builder.Configuration.GetSection("OpenAi"));

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.AddDiscordInteractions();

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
