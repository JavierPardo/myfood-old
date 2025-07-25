using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class ItemPriceHistoryRepository : EntityModelRepository<ItemPriceHistory, long>, IItemPriceHistoryRepository
    {
        public ItemPriceHistoryRepository(DataContext context, ILogger<ItemPriceHistory> logger) : base(context, logger)
        {
        }

        public ItemPriceHistory GetLastPriceHistoryByItemId(long id)
        {
            return _dbSet.FirstOrDefault(iph => !iph.EndDate.HasValue && iph.ItemId == id);
        }

        public ItemPriceHistory GetPriceHistoryByItemId(long id)
        {
            return _dbSet.FirstOrDefault(iph => iph.ItemId == id);
        }
    }
}