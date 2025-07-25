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
    public class OrderExtraRepository : EntityModelRepository<OrderExtra, long>, IOrderExtraRepository
    {
        public OrderExtraRepository(DataContext context, ILogger<OrderExtra> logger) : base(context, logger)
        {
        }

        public IEnumerable<OrderExtra> GetAllByEventId(long eventId)
        {
            var orderExtras = _dbSet.Where(orderExtra => orderExtra.Order.EventId == eventId).ToList();
            return orderExtras.OrderBy(o=>o.Id);
        }

        public IEnumerable<OrderExtra> GetAllByEventIdAndOrderBillable(long eventId)
        {
            return _dbSet.Where(orderExtra => orderExtra.Order.EventId == eventId && orderExtra.Order.OrderStatus.Billable).ToList();
        }

        public ICollection<OrderExtra> GetAllByOrderId(long orderId)
        {
            var orderExtras=_dbSet.Where(orderExtra => orderExtra.OrderId == orderId).ToList();
            return orderExtras;
        }
    }
}
