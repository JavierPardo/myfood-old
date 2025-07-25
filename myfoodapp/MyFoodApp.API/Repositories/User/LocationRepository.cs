using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class LocationRepository:EntityModelRepository<Location, long>,ILocationRepository
    {
        public LocationRepository(DataContext dataContext, ILogger<Location> logger):base(dataContext, logger)
        {

        }

        public IEnumerable<Location> GetLocationsByUserId(long userId)
        {
            return _dbSet.Where(l => l.UserId == userId);
        }
    }
}
