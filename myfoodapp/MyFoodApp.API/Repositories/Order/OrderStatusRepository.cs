using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class OrderStatusRepository : EntityModelRepository<OrderStatus, int>, IOrderStatusRepository
    {
        public OrderStatusRepository(DataContext context, ILogger<OrderStatus> logger) : base(context, logger)
        {
        }
    }
}
