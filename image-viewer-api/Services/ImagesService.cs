using ImageViewerApi.Models;

namespace ImageViewerApi.Services;

public interface IImagesService
{
    Task<ImageData[]> Get();
}

public class ImagesService : IImagesService
{
    private const string ImagesApiUrl = "https://picsum.photos/v2/list?page=1&limit=100";
    private ImageData[]? _imagesData;
        
    public async Task<ImageData[]> Get()
    {
        if (_imagesData == null)
        {
            using HttpClient httpClient = new();
            var response = await httpClient.GetAsync(ImagesApiUrl);
            response.EnsureSuccessStatusCode();
            _imagesData = await response.Content.ReadFromJsonAsync<ImageData[]>();
        }
        
        Random random = new();
        
        return new []
        {
            _imagesData[random.Next(0, _imagesData.Length)],
            _imagesData[random.Next(0, _imagesData.Length)],
            _imagesData[random.Next(0, _imagesData.Length)],
            _imagesData[random.Next(0, _imagesData.Length)],
            _imagesData[random.Next(0, _imagesData.Length)]
        };
    }
}