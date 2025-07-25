using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusHistoryController : ControllerBase
    {
        private readonly IOrderStatusHistoryService _orderStatusHistoryService;

        public OrderStatusHistoryController(IOrderStatusHistoryService orderStatusHistoryService)
        {
            _orderStatusHistoryService = orderStatusHistoryService;

        }

        // GET api/<OrderStatusHistoryController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("{cryptOrderId}")]
        public IEnumerable<OrderStatusHistory> GetStatusHistoryByOrderId(string cryptOrderId)
        {
            return _orderStatusHistoryService.GetStatusHistoriesByOrderId(cryptOrderId.DecodeFromBase32String<long>());
        }

        // POST api/<OrderStatusHistoryController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddOrderStatusHistory([FromBody] OrderStatusHistory orderStatusHistory)
        {
            _orderStatusHistoryService.Add(orderStatusHistory);
        }

    }
}
