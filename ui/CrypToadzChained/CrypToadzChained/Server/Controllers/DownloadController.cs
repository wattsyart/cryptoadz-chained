using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Nethereum.Hex.HexConvertors.Extensions;
using SixLabors.Fonts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.PixelFormats;

namespace CrypToadzChained.Server.Controllers;

[ApiController]
public class DownloadController : ControllerBase
{
    private readonly IOptionsSnapshot<Web3Options> _options;
    private readonly ILogger<Web3Options> _logger;

    private static readonly RichTextOptions Text;
    private static readonly RectangleF Box;

    private static readonly List<ulong> TokenIds;

    static DownloadController()
    {
        TokenIds = ParityScope.Generated.TokenIds().Select(x => (ulong) x).ToList();

        FontCollection collection = new();
        var family = collection.Add("PressStart2P-Regular.ttf");
        var font = family.CreateFont(12, FontStyle.Bold);
        Text = new RichTextOptions(font)
        {
            HorizontalAlignment = HorizontalAlignment.Left,
            VerticalAlignment = VerticalAlignment.Top,
        };
        var box = TextMeasurer.MeasureSize("4", Text);
        Box = new RectangleF(new PointF(0, 0), new SizeF(box.Width + 1, box.Height + 1));
    }

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

    [HttpGet("game/img/{seed}/{number}")]
    public async Task<IActionResult> GetGameTokenURIImageFromSeed(string seed, int number)
    {
        string tokenUri;
        if (ulong.TryParse(seed, out var tokenId) && TokenIds.Contains(tokenId))
        {
            tokenUri = await ToadzService.GetCanonicalTokenURIAsync((uint) tokenId, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
        }
        else
        {
            tokenUri = await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);    
        }

        var json = Encoding.UTF8.GetString(Convert.FromBase64String(tokenUri.Replace(DataUri.Json, "")));
        var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(json);
        return StreamImage(metadata, number);
    }

    [HttpGet("game/imgs")]
    public async Task<IActionResult> GetGameTokenURIImagesFromSeed([FromQuery] string seeds)
    {
        var seedList = seeds.Split(",", StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
            .ToList();

        var gameCachePath = $"{string.Join("_", seedList)}_cache.png";
        if (System.IO.File.Exists(gameCachePath))
        {
            return File(System.IO.File.OpenRead(gameCachePath), "image/gif", DateTimeOffset.Now, ETag(Encoding.UTF8.GetBytes(gameCachePath)));
        }

        var metadataList = new List<JsonTokenMetadata>();

        foreach (var seed in seedList)
        {
            string tokenUri;
            if (ulong.TryParse(seed, out var tokenId) && TokenIds.Contains(tokenId))
            {
                tokenUri = await ToadzService.GetCanonicalTokenURIAsync((uint) tokenId, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);
            }
            else
            {
                tokenUri = await ToadzService.GetRandomTokenURIFromSeedAsync(seed, _options.Value.OnChainRpcUrl, _options.Value.OnChainContractAddress, _logger);    
            }

            var json = Encoding.UTF8.GetString(Convert.FromBase64String(tokenUri.Replace(DataUri.Json, "")));
            var metadata = JsonSerializer.Deserialize<JsonTokenMetadata>(json);
            if (metadata != null)
            {
                metadataList.Add(metadata);
            }
        }

        if (metadataList.Count != 4)
        {
            return BadRequest();
        }

        var imageList = new List<Image>();

        for (var i = 0; i < metadataList.Count; i++)
        {
            var number = i + 1;
            var metadata = metadataList[i];
            var buffer = Convert.FromBase64String(metadata.Image!.Replace(DataUri.Gif, string.Empty));
            var identifier = metadata.Name?.Replace("CrypToadz #", string.Empty);
            var cachePath = $"{identifier}_{number}_cache.png";

            if (System.IO.File.Exists(cachePath))
            {
                imageList.Add(await Image.LoadAsync(System.IO.File.OpenRead(cachePath), GifDecoder));
            }
            else
            {
                var image = PrepareImage(GifDecoder, buffer, number);
                await using var ms = new MemoryStream();
                await image.SaveAsync(ms, GifEncoder);
                ms.Position = 0;

                var resized = ms.ToArray();
                await System.IO.File.WriteAllBytesAsync(cachePath, resized);
                imageList.Add(image);
            }
        }

        if (imageList.Count != 4)
        {
            return BadRequest(); 
        }
        
        const int width = 2880;
        const int height = 2880;
        using var combined = new Image<Rgba32>(width, height);
        {
            combined.Mutate(x => 
            {
                x.DrawImage(imageList[0], new Point(0, 0), 1);
                x.DrawImage(imageList[1], new Point(1440, 0), 1);
                x.DrawImage(imageList[2], new Point(0, 1440), 1);
                x.DrawImage(imageList[3], new Point(1440, 1440), 1);
            });

            await using var ms = new MemoryStream();
            await combined.SaveAsync(ms, GifEncoder);
            ms.Position = 0;

            var buffer = ms.ToArray();
            await System.IO.File.WriteAllBytesAsync(gameCachePath, buffer);
            return File(buffer, "image/gif", DateTimeOffset.Now, ETag(buffer));
        }
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

    [NonAction]
    private IActionResult StreamImage(JsonTokenMetadata? metadata, int? number = null) => metadata!.Image!.StartsWith(DataUri.Gif) ? StreamGif(metadata, number) : StreamPng(metadata, number);

    [NonAction]
    private IActionResult StreamGif(JsonTokenMetadata metadata, int? number)
    {
        return StreamImageImpl(metadata, "image/gif", number, DataUri.Gif, GifEncoder, GifDecoder);
    }

    [NonAction]
    private IActionResult StreamPng(JsonTokenMetadata metadata, int? number)
    {
        return StreamImageImpl(metadata, "image/png", number, DataUri.Png, PngEncoder, PngDecoder);
    }
    
    [NonAction]
    private IActionResult StreamImageImpl(JsonTokenMetadata metadata, string mediaType, int? number, string dataUri,
        IImageEncoder encoder, IImageDecoder decoder)
    {
        var buffer = Convert.FromBase64String(metadata.Image!.Replace(dataUri, string.Empty));

        var identifier = metadata.Name?.Replace("CrypToadz #", string.Empty).Replace("/", "_");

        if (ulong.TryParse(identifier, out var tokenId) && tokenId.IsLargeImage())
            return File(buffer, mediaType, DateTimeOffset.Now, ETag(buffer));

        var cachePath = number.HasValue ? $"{identifier}_{number}_cache.png" : $"{identifier}_cache.png";

        if (System.IO.File.Exists(cachePath))
            return File(System.IO.File.OpenRead(cachePath), mediaType, DateTimeOffset.Now, ETag(buffer));

        return PrepareAndCacheImageFile(mediaType, encoder, decoder, buffer, cachePath, number);
    }

    [NonAction]
    private IActionResult PrepareAndCacheImageFile(string mediaType, IImageEncoder encoder, IImageDecoder decoder, byte[] buffer, string cachePath, int? number)
    {
        var image = PrepareImage(decoder, buffer, number);

        using var ms = new MemoryStream();
        image.Save(ms, encoder);
        ms.Position = 0;

        var resized = ms.ToArray();
        System.IO.File.WriteAllBytes(cachePath, resized);

        return File(resized, mediaType, DateTimeOffset.Now, ETag(buffer));
    }

    private static Image PrepareImage(IImageDecoder decoder, byte[] buffer, int? number)
    {
        var image = Image.Load(buffer, decoder);

        if (number.HasValue)
        {
            var text = number.Value.ToString();
            image.Mutate(x =>
            {
                x.SetGraphicsOptions(o => { o.Antialias = false; });
                x.Fill(Color.Black, Box);
                x.DrawText(Text, text, Color.White);
            });
        }

        image.Mutate(x => x.Resize(new ResizeOptions
        {
            Size = new Size(1440, 1440),
            Sampler = KnownResamplers.NearestNeighbor
        }));
        return image;
    }
}