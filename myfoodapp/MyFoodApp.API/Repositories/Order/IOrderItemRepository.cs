using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderItemRepository : IEntityModelRepository<OrderItem, long>
    {
        ICollection<OrderItem> GetAllByOrderId(long orderId);
        ICollection<OrderItem> GetAllByEventId(long eventId);
        ICollection<OrderItem> GetAllByEventIdAndOrderBillable(long eventId);
    }
}
