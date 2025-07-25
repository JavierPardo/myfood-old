using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItemService _orderItemService;

        public OrderItemController(IOrderItemService orderItemService)
        {
            _orderItemService = orderItemService;
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpGet("Order/{cryptOrderId}")]
        public IActionResult GetOrderItemsByOrderId(string cryptOrderId)
        {
            return Ok(_orderItemService.GetAllByOrderId(cryptOrderId.DecodeFromBase32String<long>()));
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public IEnumerable<OrderItem> GetOrderItemsByEventId(long eventId)
        {
            return _orderItemService.GetAllByEventId(eventId);
        }
    }
}
