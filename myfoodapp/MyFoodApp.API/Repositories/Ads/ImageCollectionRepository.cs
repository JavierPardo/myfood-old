using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class ImageCollectionRepository:EntityModelRepository<ImageCollection, int>,IImageCollectionRepository
    {
        public ImageCollectionRepository(DataContext dataContext, ILogger<ImageCollection> logger):base(dataContext, logger)
        {
        }
    }
}
