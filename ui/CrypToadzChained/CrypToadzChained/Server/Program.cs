using CrypToadzChained.Shared;

const string nodeDir = "/usr/local/bin";
var path = Environment.GetEnvironmentVariable("PATH") ?? "";
if(!path.Contains(nodeDir))
    Environment.SetEnvironmentVariable("PATH", $"{path};{nodeDir}");

var builder = WebApplication.CreateBuilder(args);
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
