using Microsoft.VisualBasic;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderExtraRepository : IEntityModelRepository<OrderExtra, long>
    {
        ICollection<OrderExtra> GetAllByOrderId(long orderId);
        IEnumerable<OrderExtra> GetAllByEventId(long eventId);
        IEnumerable<OrderExtra> GetAllByEventIdAndOrderBillable(long eventId);
    }
}
