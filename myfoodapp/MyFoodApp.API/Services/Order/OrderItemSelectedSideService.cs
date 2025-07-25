using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class OrderItemSelectedSideService: IOrderItemSelectedSideService
    {
        private readonly IOrderItemSelectedSideRepository _orderItemSelectedSideRepository;

        public OrderItemSelectedSideService(IOrderItemSelectedSideRepository orderItemSelectedSideRepository)
        {
            _orderItemSelectedSideRepository = orderItemSelectedSideRepository;
        }

        public IEnumerable<OrderItemSelectedSides> GetOrderItemSidesByEventId(long eventId)
        {
            return _orderItemSelectedSideRepository.GetAllByEventId(eventId);
        }

        public IEnumerable<OrderItemSelectedSides> GetOrderItemSidesByOrderId(long orderId)
        {
            return _orderItemSelectedSideRepository.GetAllByOrderId(orderId);
        }
    }
}
