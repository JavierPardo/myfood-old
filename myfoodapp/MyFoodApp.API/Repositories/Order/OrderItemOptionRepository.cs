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
    public class OrderItemOptionRepository : EntityModelRepository<OrderItemSelectedOptions, long>, IOrderItemOptionRepository
    {
        public OrderItemOptionRepository(DataContext context, ILogger<OrderItemSelectedOptions> logger) : base(context, logger)
        {
        }

        public IEnumerable<OrderItemSelectedOptions> GetAllByEventId(long eventId)
        {
            return _dbSet.Where(orderItemOption => orderItemOption.OrderItem.Order.EventId == eventId);
        }
    }
}
