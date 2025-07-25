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
    public class ItemsSidesRepository : EntityModelRepository<ItemsSides, long>, IItemsSidesRepository
    {
        public ItemsSidesRepository(DataContext context, ILogger<ItemsSides> logger) : base(context, logger)
        {
        }
    }
}