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
    public class OrderItemRepository : EntityModelRepository<OrderItem, long>, IOrderItemRepository
    {
        public OrderItemRepository(DataContext context, ILogger<OrderItem> logger) : base(context, logger)
        {
        }

        public override void Create(OrderItem orderItem)
        {
            orderItem.Price = orderItem.Item.CurrentPrice;
            base.Create(orderItem);
            
        }
        public ICollection<OrderItem> GetAllByEventId(long eventId)
        {
            var orderItems = _dbSet.Where(orderItem => orderItem.Order.EventId==eventId).ToList();
            return orderItems;
        }

        public ICollection<OrderItem> GetAllByEventIdAndOrderBillable(long eventId)
        {
            var orderItems = _dbSet.Where(orderItem => orderItem.Order.OrderStatus.Billable&& orderItem.Order.EventId==eventId).ToList();
            return orderItems;
        }

        public ICollection<OrderItem> GetAllByOrderId(long orderId)
        {
            var orderItems= _dbSet.Where(orderItem => orderItem.OrderId == orderId).ToList();
            return orderItems;
        }
    }
}
