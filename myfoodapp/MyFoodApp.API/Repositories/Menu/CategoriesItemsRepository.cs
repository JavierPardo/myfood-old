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
    public class CategoriesItemsRepository : EntityModelRepository<CategoriesItems, long>, ICategoriesItemsRepository
    {
        public CategoriesItemsRepository(DataContext context, ILogger<CategoriesItems> logger) : base(context, logger)
        {
        }

        public IEnumerable<CategoriesItems> GetByItemId(long itemId)
        {
            return _dbSet.Where(ci => ci.ItemId == itemId);
        }
    }
}