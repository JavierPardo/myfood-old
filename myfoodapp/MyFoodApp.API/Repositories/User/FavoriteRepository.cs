using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class FavoriteRepository : EntityModelRepository<Favorite, long>, IFavoriteRepository
    {
        public FavoriteRepository(DataContext dataContext, ILogger<Favorite> logger) : base(dataContext, logger)
        {

        }

        public IEnumerable<Favorite> GetFavoritesByUserId(long userId)
        {
            return _dbSet.Where(f => f.UserId == userId);
        }
    }
}
