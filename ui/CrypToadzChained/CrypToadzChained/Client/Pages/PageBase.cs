using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using CrypToadzChained.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;
using Microsoft.JSInterop;

namespace CrypToadzChained.Client.Pages
{
    public class PageBase : ComponentBase
    {
        public const string PngDataUri = "data:image/png;base64,";
        public const string GifDataUri = "data:image/gif;base64,";
        public const string JsonDataUri = "data:application/json;base64,";

        [Inject]
        public HttpClient Http { get; set; } = null!;

        [Inject]
        public ILogger<PageBase> Logger { get; set; } = null!;

        [Inject]
        public NavigationManager Nav { get; set; } = null!;

        [Inject]
        public IOptionsSnapshot<Web3Options> Options { get; set; } = null!;

        [Inject]
        public IJSRuntime Js { get; set; } = null!;

        protected async Task DownloadImageAsync(string imageUri, string filename = "toad")
        {
            if (string.IsNullOrWhiteSpace(imageUri))
                return;

            string extension;
            string data;
            if (imageUri.StartsWith(PngDataUri))
            {
                extension = "png";
                data = imageUri.Replace(PngDataUri, "");
            }
            else
            {
                extension = "gif";
                data = imageUri.Replace(GifDataUri, "");
            }
            
            var buffer = Convert.FromBase64String(data);
            var fileStream = new MemoryStream(buffer);

            using var stream = new DotNetStreamReference(stream: fileStream);
            await Js.InvokeVoidAsync("downloadFileFromStream", $"{filename}.{extension}", stream);
        }

        protected async Task DownloadMetadataAsync(JsonTokenMetadata? metadata, string filename = "toad")
        {
            if (metadata == null)
                return;

            var imageData = metadata.ImageData;
            byte[] buffer;
            try
            {
                metadata.ImageData = null;
                var data = JsonSerializer.Serialize(metadata, new JsonSerializerOptions(JsonSerializerDefaults.Web)
                {
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
                });
                buffer = Encoding.UTF8.GetBytes(data);
            }
            finally
            {
                metadata.ImageData = imageData;
            }
            
            var fileStream = new MemoryStream(buffer);
            using var stream = new DotNetStreamReference(stream: fileStream);
            await Js.InvokeVoidAsync("downloadFileFromStream", $"{filename}.json", stream);
        }

        protected async Task ShareAsync(string url) => await Js.InvokeAsync<object>("open", url, "_blank");
    }
}