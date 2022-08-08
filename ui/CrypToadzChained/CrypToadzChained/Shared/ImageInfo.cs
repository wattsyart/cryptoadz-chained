using System.Text.Json.Serialization;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;

namespace CrypToadzChained.Shared;

public sealed class ImageInfo
{
    [JsonIgnore] public Image<Rgba32> Image { get; set; } = null!;

    public ImageType? Type { get; set; }

    public string Uri => Type switch
    {
        ImageType.Png => Image.ToBase64String(PngFormat.Instance)[Constants.PngDataUri.Length..]!,
        ImageType.Gif => Image.ToBase64String(GifFormat.Instance)[Constants.GifDataUri.Length..]!,
        null => throw new NullReferenceException(),
        _ => throw new ArgumentOutOfRangeException()
    };

    public Size Size => Image.Size();
}