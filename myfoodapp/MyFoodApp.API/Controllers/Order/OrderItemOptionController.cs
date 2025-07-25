using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemOptionController:ControllerBase
    {
        private readonly IOrderItemOptionService _orderItemOptionService;

        public OrderItemOptionController(IOrderItemOptionService orderItemOptionService)
        {
            _orderItemOptionService = orderItemOptionService;
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public IEnumerable<OrderItemSelectedOptions> GetAllOrderItemOptionsByEventId(long eventId)
        {
            return _orderItemOptionService.GetOrderItemOptionsByEventId(eventId);
        }
    }
}
