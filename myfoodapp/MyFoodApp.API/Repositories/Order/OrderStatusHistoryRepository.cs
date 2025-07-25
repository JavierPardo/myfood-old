using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class OrderStatusHistoryRepository : EntityModelRepository<OrderStatusHistory, long>, IOrderStatusHistoryRepository
    {
        public OrderStatusHistoryRepository(DataContext context, ILogger<OrderStatusHistory> logger) : base(context, logger)
        {
        }

        public IEnumerable<OrderStatusHistory> GetAllByOrderId(long orderId)
        {
            return _dbSet.Where(x => x.OrderId == orderId).ToList();
        }

        public OrderStatusHistory GetStatusHistoryByOrderId(long id)
        {
            return _dbSet.FirstOrDefault(x => x.OrderId==id);
        }
    }
}
