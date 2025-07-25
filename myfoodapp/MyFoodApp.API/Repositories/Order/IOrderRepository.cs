using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderRepository : IEntityModelRepository<Order, long>
    {
        Order GetAllCompleteById(long id);
        IEnumerable<Order> GetOrdersByEventId(long eventId);
        IEnumerable<Order> GetOrdersByBranchId(int branchId);
        IEnumerable<Order> GetAllByEventId(long eventId);
        IEnumerable<Order> GetAllByEventIdAndStatus(long eventId, IEnumerable<int> statuses);
        IEnumerable<Order> GetByDateAndStatus(IEnumerable<int> statusIds, DateTime orderDate, IEnumerable<int> eventTypeIds);
    }
}
