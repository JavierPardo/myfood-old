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
    public class OptionRepository : EntityModelRepository<Option, long>, IOptionRepository
    {
        public OptionRepository(DataContext context, ILogger<Option> logger) : base(context, logger)
        {
        }

        public ICollection<Option> GetAllByItem(long itemId)
        {
            return _dbSet.Where(o => o.ItemsOptions.Any(i => i.ItemId == itemId)).ToList();
        }

        public ICollection<Option> GetAllByIds(IEnumerable<long> idList)
        {
            return _dbSet.Where(x => idList.Contains(x.Id)).ToList();
        }

        public ICollection<Option> GetAllByOrderId(long orderId)
        {
            return _dbSet.Where(option => option.OrderItemSelectedOptions.Any(orderItemSelectedOption=>orderItemSelectedOption.OrderItem.OrderId==orderId)).ToList();
        }
    }
}