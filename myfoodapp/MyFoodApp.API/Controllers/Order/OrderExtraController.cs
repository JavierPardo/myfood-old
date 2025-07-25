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
    public class OrderExtraController : ControllerBase
    {
        private readonly IOrderExtraService _orderExtraService;

        public OrderExtraController(IOrderExtraService orderExtraService)
        {
            _orderExtraService = orderExtraService;
        }

        [Authorize(Roles = "Super Admin, Employee, Employee, Admin, Accounting, User")]
        [HttpGet("Order/{cryptOrderId}")]
        public IActionResult GetAllByOrderId(string cryptOrderId)
        {
            return Ok(_orderExtraService.GetOrderExtrasByOrderId(cryptOrderId.DecodeFromBase32String<long>()));
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public IEnumerable<OrderExtra> GetAllByEventId(long eventId)
        {
            return _orderExtraService.GetOrderExtrasByEventId(eventId);
        }
    }
}
