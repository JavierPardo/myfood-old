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
    public class AdImageRepository:EntityModelRepository<AdImage,int>,IAdImageRepository
    {
        public AdImageRepository(DataContext dataContext, ILogger<AdImage> logger):base(dataContext, logger)
        {
        }
        public IEnumerable<AdImage> GetAdImagesByCollection(int id)
        {
            return _dbSet.Where(i => i.CollectionId == id);
        }
    }
}
