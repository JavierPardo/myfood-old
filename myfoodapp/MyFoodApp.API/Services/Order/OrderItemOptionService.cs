using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class OrderItemOptionService : IOrderItemOptionService
    {
        private readonly IOrderItemOptionRepository _orderItemOptionRepository;

        public OrderItemOptionService(IOrderItemOptionRepository orderItemOptionRepository)
        {
            _orderItemOptionRepository = orderItemOptionRepository;
        }
        public IEnumerable<OrderItemSelectedOptions> GetOrderItemOptionsByEventId(long eventId)
        {
            return _orderItemOptionRepository.GetAllByEventId(eventId).OrderBy(o=>o.Id);
        }
    }
}
