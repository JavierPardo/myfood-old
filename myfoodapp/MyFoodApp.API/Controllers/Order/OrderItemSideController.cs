using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemSideController : ControllerBase
    {
        private readonly IOrderItemSelectedSideService _orderItemSelectedSideService;

        public OrderItemSideController(IOrderItemSelectedSideService orderItemSelectedSideService)
        {
            _orderItemSelectedSideService = orderItemSelectedSideService;
        }


        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Employee")]
        [HttpGet("Order/{cryptOrderId}")]
        public OrderItemSelectedSides[] GetItemSideByOrderId(string cryptOrderId)
        {
            if (string.IsNullOrWhiteSpace(cryptOrderId))
            {
                return new OrderItemSelectedSides[0];
            }
            return _orderItemSelectedSideService.GetOrderItemSidesByOrderId(cryptOrderId.DecodeFromBase32String<long>()).ToArray();
        }


        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public OrderItemSelectedSides[] GetItemSideByeventId(long eventId)
        {
            if (eventId==0)
            {
                return new OrderItemSelectedSides[0];
            }
            return _orderItemSelectedSideService.GetOrderItemSidesByEventId(eventId).ToArray();
        }

    }
}
