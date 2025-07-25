using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IImageCollectionService
    {
        void Add(ImageCollection collection);
        void Update(ImageCollection collection);
        ImageCollection Get(int id);
        ICollection<ImageCollection> GetAll();
        void Delete(int id);
    }
}
