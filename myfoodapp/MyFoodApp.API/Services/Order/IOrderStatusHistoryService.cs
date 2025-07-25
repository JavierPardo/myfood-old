using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderStatusHistoryService
    {
        void Add(OrderStatusHistory orderStatusHistory);
        void Update(OrderStatusHistory orderStatusHistory);
        OrderStatusHistory Get(long id);
        ICollection<OrderStatusHistory> GetAll();
        void Delete(long id);
        OrderStatusHistory GetStatusHistoryByOrderId(long id);
        IEnumerable<OrderStatusHistory> GetStatusHistoriesByOrderId(long orderId);
    }
}
