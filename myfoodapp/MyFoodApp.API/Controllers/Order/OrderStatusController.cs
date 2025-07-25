using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusController : ControllerBase
    {
        private readonly IOrderStatusService _orderStatusService;

        public OrderStatusController(IOrderStatusService orderStatusService)
        {
            _orderStatusService = orderStatusService;

        }

        // GET: api/<OrderStatusController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet]
        public IEnumerable<OrderStatus> GetOrderStatuses()
        {
            return _orderStatusService.GetAll();
        }

        // GET api/<OrderStatusController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("{id}")]
        public OrderStatus GetByOrderStatusId(int id)
        {
            return _orderStatusService.Get(id);
        }

        // POST api/<OrderStatusController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddOrderStatus([FromBody] OrderStatus orderStatus)
        {
            _orderStatusService.Add(orderStatus);
        }

        // PUT api/<OrderStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateOrderStatus([FromBody] OrderStatus orderStatus)
        {
            _orderStatusService.Update(orderStatus);
        }

        // DELETE api/<OrderStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteOrderStatus(int id)
        {
            _orderStatusService.Delete(id);
        }
    }
}
