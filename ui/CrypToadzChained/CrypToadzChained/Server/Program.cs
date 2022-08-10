using CrypToadzChained.Shared;

var builder = WebApplication.CreateBuilder(args);

var path = Environment.GetEnvironmentVariable("PATH");
Environment.SetEnvironmentVariable("PATH", $@"{path};/opt/hostedtoolcache/node/16.16.0/x64/bin");

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();

builder.Services.Configure<Web3Options>(builder.Configuration.GetSection("Web3"));


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
app.UseRouting();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
