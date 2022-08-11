using System.Net;
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
        [Inject]
        public HttpClient Http { get; set; } = null!;

        [Inject]
        public ILogger<PageBase>? Logger { get; set; }

        [Inject]
        public NavigationManager Nav { get; set; } = null!;

        [Inject]
        public IOptions<Web3Options> Options { get; set; } = null!;

        [Inject]
        public IJSRuntime Js { get; set; } = null!;

        protected async Task DownloadImageAsync(string imageUri, string filename)
        {
            if (string.IsNullOrWhiteSpace(imageUri))
                return;

            string extension;
            string data;
            if (imageUri.StartsWith(DataUri.Png))
            {
                extension = "png";
                data = imageUri.Replace(DataUri.Png, "");
            }
            else
            {
                extension = "gif";
                data = imageUri.Replace(DataUri.Gif, "");
            }
            
            var buffer = Convert.FromBase64String(data);
            var fileStream = new MemoryStream(buffer);

            using var stream = new DotNetStreamReference(stream: fileStream);
            await Js.InvokeVoidAsync("downloadFileFromStream", $"{filename}.{extension}", stream);
        }

        protected async Task DownloadMetadataAsync(JsonTokenMetadata? metadata, string filename, bool canonical)
        {
            if (metadata == null)
                return;

            var imageData = metadata.ImageData;

            var size = metadata.Attributes.SingleOrDefault(x => x.TraitType == "Size");
            if (canonical && size != null)
                metadata.Attributes.Remove(size); // remove size attribute if it was augmented through the app via `isTall`
            
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

                if (canonical && size != null)
                    metadata.Attributes.Insert(0, size); // add size attribute back for display purposes
            }

            var ms = new MemoryStream(buffer);
            using var stream = new DotNetStreamReference(ms);
            await Js.InvokeVoidAsync("downloadFileFromStream", $"{filename}.json", stream);
        }

        protected async Task ShareAsync(string url) => await Js.InvokeAsync<object>("open", url, "_blank");

        protected Task EditInBuilderAsync(JsonTokenMetadata? metadata)
        {
            if (metadata == null)
                return Task.CompletedTask;
            
            var toad = metadata.ToToad();
            var meta = toad.ToMetadataBuffer();
            var seed = Convert.ToBase64String(meta);

            Nav.NavigateTo($"/builder/?seed={WebUtility.UrlEncode(seed)}");
            return Task.CompletedTask;
        }
    }
}