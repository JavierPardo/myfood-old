using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IAdImageService
    {
        void Add(AdImage image);
        void Update(AdImage image);
        AdImage Get(int id);
        void Delete(int id);
        IEnumerable<AdImage> GetAdImagesByCollection(int id);
    }
}
