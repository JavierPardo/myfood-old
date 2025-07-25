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
    public class OrderItemSelectedSideRepository : EntityModelRepository<OrderItemSelectedSides, long>, IOrderItemSelectedSideRepository
    {
        public OrderItemSelectedSideRepository(DataContext context, ILogger<OrderItemSelectedSides> logger) : base(context, logger)
        {
        }

        public IEnumerable<OrderItemSelectedSides> GetAllByEventId(long eventId)
        {
            return _dbSet.Where(orderItemSide => orderItemSide.OrderItem.Order.EventId == eventId);
        }

        public IEnumerable<OrderItemSelectedSides> GetAllByOrderId(long orderId)
        {
            return _dbSet.Where(orderItemSide => orderItemSide.OrderItem.OrderId == orderId);
        }
    }
}
