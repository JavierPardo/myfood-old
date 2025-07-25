using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class OrderExtraService : IOrderExtraService
    {
        private readonly IOrderExtraRepository _orderExtraRepository;

        public OrderExtraService(IOrderExtraRepository orderExtraRepository)
        {
            _orderExtraRepository = orderExtraRepository;
        }

        public IEnumerable<OrderExtra> GetOrderExtrasByEventId(long eventId)
        {
            return _orderExtraRepository.GetAllByEventId(eventId);
        }

        public IEnumerable<OrderExtra> GetOrderExtrasByOrderId(long orderId)
        {
            return _orderExtraRepository.GetAllByOrderId(orderId);
        }
    }
}
