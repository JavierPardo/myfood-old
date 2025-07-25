using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class OrderStatusService : IOrderStatusService
    {
        private readonly IOrderStatusRepository _orderStatusRepository;

        public OrderStatusService(IOrderStatusRepository orderStatusRepository)
        {
            _orderStatusRepository = orderStatusRepository;

        }
        
        public void Add(OrderStatus orderStatus) => _orderStatusRepository.Create(orderStatus);
        public void Update(OrderStatus orderStatus) => _orderStatusRepository.Update(orderStatus);
        public OrderStatus Get(int id) => _orderStatusRepository.GetByKey(id);
        public ICollection<OrderStatus> GetAll() => _orderStatusRepository.GetAll();
        public void Delete(int id) => _orderStatusRepository.DeleteByKey(id);
    }
}
