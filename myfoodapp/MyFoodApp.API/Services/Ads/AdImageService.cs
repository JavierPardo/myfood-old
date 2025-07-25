using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class AdImageService : IAdImageService
    {
        private readonly IAdImageRepository _adImageRepository;
        private readonly IImagesStorage _imagesStorage;

        public AdImageService(IAdImageRepository adImageRepository,
            IImagesStorage imagesStorage)
        {
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("adimages");
            _adImageRepository = adImageRepository;
        }
        public void Add(AdImage image) {

            string imageDataUrl = image.ImageUrl;
            _adImageRepository.Create(image);
            image.ImageUrl = _imagesStorage.StoreImage(image.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(int id) {
            _adImageRepository.DeleteByKey(id); 
        }

        public AdImage Get(int id) {
            var image = _adImageRepository.GetByKey(id);
            image.ImageUrl = _imagesStorage.GetImage(id.EncodeAsBase32String());
            return image;
        }

        public IEnumerable<AdImage> GetAdImagesByCollection(int id)
        {
            foreach (var image in _adImageRepository.GetAdImagesByCollection(id))
            {
                image.ImageUrl = _imagesStorage.GetImage(image.Id.EncodeAsBase32String());
                yield return image;
            }
        }

        public void Update(AdImage image) {
            var imageDataUrl = image.ImageUrl;
            _adImageRepository.Update(image);
            image.ImageUrl = _imagesStorage.StoreImage(image.Id.EncodeAsBase32String(), imageDataUrl);
        }
    }
}
