using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderItemService
    {
        IEnumerable<OrderItem> GetAllByOrderId(long v);
        IEnumerable<OrderItem> GetAllByEventId(long v);
    }
}
