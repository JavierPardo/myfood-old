using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class OrderItemService:IOrderItemService
    {
        private readonly IOrderItemRepository _orderRepository;

        public OrderItemService(IOrderItemRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public IEnumerable<OrderItem> GetAllByEventId(long eventId)
        {
            var orderItems = _orderRepository.GetAllByEventId(eventId);
            return orderItems.OrderBy(oi=>oi.Id);
        }

        public IEnumerable<OrderItem> GetAllByOrderId(long orderId)
        {
            var orderItems = _orderRepository.GetAllByOrderId(orderId);
            return orderItems;
        }
    }
}
