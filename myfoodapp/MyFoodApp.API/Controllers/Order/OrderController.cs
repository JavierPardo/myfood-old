using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Services;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        private readonly IEventService _eventService;

        public OrderController(IOrderService orderService, IMapper mapper, IEventService eventService)
        {
            _orderService = orderService;
            _mapper = mapper;
            _eventService = eventService;
        }

        // GET api/<OrderController>/getbybranchid/1
        [Authorize(Roles = "Super Admin, Employee, Accounting, Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public IEnumerable<Order> GetOrdersByBranchId(int branchId)
        {

            return _orderService.GetOrdersByBranchId(branchId);
        }

        // GET api/<OrderController>
        [Authorize(Roles = "Super Admin, Employee, Accounting, Admin")]
        [HttpGet]
        public IEnumerable<Order> GetAllOrders()
        {
            return _orderService.GetAll();
        }

        // GET api/<OrderController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPatch("{orderCryptId}/{newStatusCrypt}")]
        public OrderDto UpdateEncryptedOrderStatus(string orderCryptId, string newStatusCrypt)
        {
            var order = _orderService.UpdateStatus(orderCryptId.DecodeFromBase32String<long>(), newStatusCrypt.DecodeFromBase32String<int>());
            _eventService.CalculateCost(order.EventId);
            return _mapper.Map<OrderDto>(order);
        }

        // GET api/<EventController>/1/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbydateandstatus/{statusId}/{date}/{eventTypeId}")]  //date in yyyyMMdd format
        public IActionResult GetByDateAndStatus(string statusId, string date, string eventTypeId)
        {
            IEnumerable<int> statusIds = statusId.Split(",", System.StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList();
            IEnumerable<int> eventTypeIds = eventTypeId.Split(",", System.StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList();
            var orders = _orderService.GetByDateAndStatus(statusIds, DateTime.ParseExact(date, "yyyyMMdd", null).ToUniversalTime(), eventTypeIds);
            return Ok(_mapper.Map<IEnumerable<OrdersByDateAndStatusDto>>(orders));
        }

        // GET api/<OrderController>/5
        [Authorize(Roles = "Super Admin, Employee, Accounting, Admin, User")]
        [HttpGet("{cryptId}")]
        public OrderDto GetByOrderId(string cryptId)
        {
            return _orderService.Get(cryptId.DecodeFromBase32String<long>());
        }

        // GET api/<OrderController>/5
        [Authorize(Roles = "Super Admin, Employee, Accounting, Admin")]
        [HttpGet("Event/{eventId}")]
        public IEnumerable<Order> GetByCryptEventId(long eventId, [FromQuery] string statuses)
        {
            var orders = _orderService.GetAllByEventId(eventId, statuses);
            return orders;
        }

        // GET api/<OrderController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, User")]
        [HttpPost("Event")]
        public Order CreateOrderEvent([FromBody] Order order)
        {
            order = _orderService.Add(order);
            _eventService.CalculateCost(order.EventId);
            return order;
        }

        // POST api/<OrderController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost]
        public void AddOrder([FromBody] OrderDto order)
        {
            _orderService.Add(order);
        }

        // PUT api/<OrderController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPut]
        public void UpdateOrder([FromBody] Order order)
        {
            //_orderService.Update(id,order);
        }

        // POST api/<OrderController>/message/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost("message/{cryptId}")]
        public IActionResult SendLogisticRequestMessage(string cryptId)
        {
            try
            {
                if (cryptId != null)
                {
                    _orderService.SendLogisticRequestMessage(cryptId.DecodeFromBase32String<long>());
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        //// DELETE api/<OrderController>/5
        //[HttpDelete("{id}")]
        //public void DeleteOrder(int id)
        //{
        //    _orderService.Delete(id);
        //}
    }
}
