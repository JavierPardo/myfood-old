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
    public class ImageCollectionService : IImageCollectionService
    {
        private readonly IImageCollectionRepository _imageCollectionRepository;

        public ImageCollectionService(IImageCollectionRepository imageCollectionRepository)
        {
            _imageCollectionRepository = imageCollectionRepository;
        }
        public void Add(ImageCollection collection) => _imageCollectionRepository.Create(collection);

        public void Delete(int id) => _imageCollectionRepository.DeleteByKey(id);

        public ImageCollection Get(int id) => _imageCollectionRepository.GetByKey(id);

        public ICollection<ImageCollection> GetAll() => _imageCollectionRepository.GetAll();

        public void Update(ImageCollection collection) => _imageCollectionRepository.Update(collection);
    }
}
