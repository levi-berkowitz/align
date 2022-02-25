using ImageViewerApi.Models;
using ImageViewerApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ImageViewerApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ImagesController : ControllerBase
{
    private readonly IImagesService _imagesService;

    public ImagesController(IImagesService imagesService)
    {
        _imagesService = imagesService;
    }
    
    [HttpGet]
    public async Task<ImageData[]> Get()
    {
        return await _imagesService.Get();
    }
}
