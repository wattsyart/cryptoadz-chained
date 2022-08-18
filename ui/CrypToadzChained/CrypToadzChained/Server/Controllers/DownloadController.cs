using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Nethereum.Hex.HexConvertors.Extensions;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
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
        return StreamImageImpl(metadata, "image/gif", DataUri.Gif, GifEncoder, GifDecoder);
    }

    private IActionResult StreamPng(JsonTokenMetadata metadata)
    {
        return StreamImageImpl(metadata, "image/png", DataUri.Png, PngEncoder, PngDecoder);
    }

    private IActionResult StreamImageImpl(JsonTokenMetadata metadata, string mediaType, string dataUri, IImageEncoder encoder, IImageDecoder decoder)
    {
        var buffer = Convert.FromBase64String(metadata.Image!.Replace(dataUri, string.Empty));

        var identifier = metadata.Name?.Replace("CrypToadz #", string.Empty);

        if (ulong.TryParse(identifier, out var tokenId) && tokenId.IsLargeImage())
            return File(buffer, mediaType, DateTimeOffset.Now, ETag(buffer));

        var cachePath = $"{identifier}_cache.png";

        if (System.IO.File.Exists(cachePath))
            return File(System.IO.File.OpenRead(cachePath), mediaType, DateTimeOffset.Now, ETag(buffer));

        var image = Image.Load(buffer, decoder);

        image.Mutate(x => x.Resize(new ResizeOptions
        {
            Size = new Size(1440, 1440),
            Sampler = KnownResamplers.NearestNeighbor
        }));

        using var ms = new MemoryStream();
        image.Save(ms, encoder);
        ms.Position = 0;

        var resized = ms.ToArray();
        System.IO.File.WriteAllBytes(cachePath, resized);

        return File(resized, mediaType, DateTimeOffset.Now, ETag(buffer));
    }
}