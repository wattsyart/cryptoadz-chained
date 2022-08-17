using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Nethereum.Hex.HexConvertors.Extensions;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;

namespace CrypToadzChained.Server.Controllers;

[ApiController]
public class DownloadController : ControllerBase
{
    private readonly IOptionsSnapshot<Web3Options> _options;
    private readonly ILogger<Web3Options> _logger;

    public DownloadController(IOptionsSnapshot<Web3Options> options, ILogger<Web3Options> logger)
    {
        _options = options;
        _logger = logger;
    }

    [HttpGet("random/img")]
    public IActionResult GetRandomTokenURIImage() => Redirect($"{Request.Path}/{(ulong)new Random().NextInt64()}");

    [HttpGet("random/img/{seed}")]
    public async Task<IActionResult> GetRandomTokenURIImageFromSeed(string seed)
    {
        var tokenUri = await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(tokenUri.Replace(DataUri.Json, "")));
        var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(json);
        return StreamImage(metadata);
    }
    
    [HttpGet("canonical/img/{tokenId}")]
    public async Task<IActionResult> GetCanonicalTokenURIImageAsync(uint tokenId)
    {
        var tokenUri = await ToadzService.GetCanonicalTokenURIAsync(tokenId, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(tokenUri.Replace(DataUri.Json, "")));
        var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(json);
        return StreamImage(metadata);
    }

    [HttpGet("canonical/json/{tokenId}")]
    public async Task<IActionResult> GetCanonicalTokenURIAsync(uint tokenId)
    {
        var tokenUri = await ToadzService.GetCanonicalTokenURIAsync(tokenId, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var buffer = Convert.FromBase64String(tokenUri.Replace(DataUri.Json, ""));
        return File(buffer, "application/json", DateTimeOffset.Now, ETag(buffer));
    }

    [HttpGet("random/json")]
    public async Task<IActionResult> GetRandomTokenURIMetadata()
    {
        var tokenUri = await ToadzService.GetRandomTokenURIAsync(_options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var buffer = Convert.FromBase64String(tokenUri.Replace(DataUri.Json, ""));
        return File(buffer, "application/json", DateTimeOffset.Now, ETag(buffer));
    }

    [HttpGet("random/json/{seed}")]
    public async Task<IActionResult> GetRandomTokenURIMetadataFromSeed(string seed)
    {
        var tokenUri = await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var buffer = Convert.FromBase64String(tokenUri.Replace(DataUri.Json, ""));
        return File(buffer, "application/json", DateTimeOffset.Now, ETag(buffer));
    }

    [HttpGet("builder/img")]
    public async Task<IActionResult> GetBuilderTokenURIImage([FromQuery(Name = "seed")] string seed)
    {
        var tokenUri = await ToadzService.BuildTokenURIFromBufferAsync(Convert.FromBase64String(seed), _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(tokenUri.Replace(DataUri.Json, "")));
        var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(json);
        return StreamImage(metadata);
    }

    [HttpGet("builder/json")]
    public async Task<IActionResult> GetBuilderTokenURIMetadata([FromQuery(Name = "seed")] string seed)
    {
        var tokenUri = await ToadzService.BuildTokenURIFromBufferAsync(Convert.FromBase64String(seed), _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        var buffer = Convert.FromBase64String(tokenUri.Replace(DataUri.Json, ""));
        return File(buffer, "application/json", DateTimeOffset.Now, ETag(buffer));
    }

    private static EntityTagHeaderValue ETag(byte[] buffer) => new($"\"{MD5.HashData(buffer).ToHex()}\"");
    
    private static readonly GifEncoder GifEncoder = new();
    private static readonly GifDecoder GifDecoder = new();

    private static readonly PngEncoder PngEncoder = new();
    private static readonly PngDecoder PngDecoder = new();

    private IActionResult StreamImage(JsonTokenMetadata? metadata) => metadata!.Image!.StartsWith(DataUri.Gif) ? StreamGif(metadata) : StreamPng(metadata);

    private IActionResult StreamGif(JsonTokenMetadata metadata)
    {
        var buffer = Convert.FromBase64String(metadata.Image!.Replace(DataUri.Gif, ""));
        var image = Image.Load(buffer, GifDecoder);

        if (image.Size().Width == 36)
        {
            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(1440, 1440),
                Sampler = KnownResamplers.NearestNeighbor
            }));
        }

        var ms = new MemoryStream();
        image.Save(ms, GifEncoder);
        ms.Position = 0;

        return File(ms, "image/gif", DateTimeOffset.Now, ETag(buffer));
    }

    private IActionResult StreamPng(JsonTokenMetadata metadata)
    {
        var buffer = Convert.FromBase64String(metadata.Image!.Replace(DataUri.Png, ""));
        var image = Image.Load(buffer, PngDecoder);

        if (image.Size().Width == 36)
        {
            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(1440, 1440),
                Sampler = KnownResamplers.NearestNeighbor
            }));
        }

        var ms = new MemoryStream();
        image.Save(ms, PngEncoder);
        ms.Position = 0;

        return File(ms, "image/png", DateTimeOffset.Now, ETag(buffer));
    }
}