using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderExtraService
    {
        IEnumerable<OrderExtra> GetOrderExtrasByOrderId(long orderId);
        IEnumerable<OrderExtra> GetOrderExtrasByEventId(long eventId);
    }
}
