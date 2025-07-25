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
    public class ItemsOptionsRepository : EntityModelRepository<ItemsOptions, long>, IItemsOptionsRepository
    {
        public ItemsOptionsRepository(DataContext context, ILogger<ItemsOptions> logger) : base(context, logger)
        {
        }

        public IEnumerable<ItemsOptions> GetByItemId(long itemId)
        {
            return _dbSet.Where(ci => ci.ItemId == itemId);
        }
    }
}