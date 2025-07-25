using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderItemSelectedSideService
    {
        IEnumerable<OrderItemSelectedSides> GetOrderItemSidesByOrderId(long orderId);
        IEnumerable<OrderItemSelectedSides> GetOrderItemSidesByEventId(long eventId);
    }
}
