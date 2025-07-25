using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class OrderStatusHistoryService : IOrderStatusHistoryService
    {
        private readonly IOrderStatusHistoryRepository _orderStatusHistoryRepository;

        public OrderStatusHistoryService(IOrderStatusHistoryRepository orderStatusHistoryRepository)
        {
            _orderStatusHistoryRepository = orderStatusHistoryRepository;

        }
        
        public void Add(OrderStatusHistory orderStatusHistory) => _orderStatusHistoryRepository.Create(orderStatusHistory);
        public void Update(OrderStatusHistory orderStatusHistory) => _orderStatusHistoryRepository.Update(orderStatusHistory);
        public OrderStatusHistory Get(long id) => _orderStatusHistoryRepository.GetByKey(id);
        public ICollection<OrderStatusHistory> GetAll() => _orderStatusHistoryRepository.GetAll();
        public void Delete(long id) => _orderStatusHistoryRepository.DeleteByKey(id);

        public OrderStatusHistory GetStatusHistoryByOrderId(long id)
        {
            return _orderStatusHistoryRepository.GetStatusHistoryByOrderId(id);
        }

        public IEnumerable<OrderStatusHistory> GetStatusHistoriesByOrderId(long orderId)
        {
            return _orderStatusHistoryRepository.GetAllByOrderId(orderId);
        }
    }
}
