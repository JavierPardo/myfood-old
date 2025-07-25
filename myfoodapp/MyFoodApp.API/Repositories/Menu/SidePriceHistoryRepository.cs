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
    public class SidePriceHistoryRepository : EntityModelRepository<SidePriceHistory, long>, ISidePriceHistoryRepository
    {
        public SidePriceHistoryRepository(DataContext context, ILogger<SidePriceHistory> logger) : base(context, logger)
        {
        }

        public SidePriceHistory GetLastPriceHistoryBySideId(long id)
        {
            return _dbSet.FirstOrDefault(sph => sph.SideId == id && !sph.EndDate.HasValue);
        }
    }
}