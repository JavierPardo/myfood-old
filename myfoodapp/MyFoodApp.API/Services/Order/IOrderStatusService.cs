using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderStatusService
    {
        void Add(OrderStatus orderStatus);
        void Update(OrderStatus orderStatus);
        OrderStatus Get(int id);
        ICollection<OrderStatus> GetAll();
        void Delete(int id);
    }
}
