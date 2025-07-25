using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderReportController : Controller
    {
        private readonly IOrderReportService _modelService;
        private readonly IMapper _mapper;

        public OrderReportController(IOrderReportService modelService,
            IMapper mapper)
        {
            _mapper = mapper;
            _modelService = modelService;
        }

        // GET: api/<OrderReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getordersbydate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOrdersByDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                var orders = _modelService.GetOrdersByDate(from, to);
                return Ok(_mapper.Map<OrdersDetailByDateReportDto>(orders));
            }
            return BadRequest();
        }

        // GET: api/<OrderReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getordersbyzoneanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOrdersByZoneAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<OrdersByZoneAndDateDto> orders = _modelService.GetOrdersByZoneAndDate(from, to);
                return Ok(orders);
            }
            return BadRequest();
        }

        // GET: api/<OrderReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getordersbygenderanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOrdersByGenderAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<OrdersByGenderAndDateDto> orders = _modelService.GetOrdersByGenderAndDate(from, to);
                return Ok(orders);
            }
            return BadRequest();
        }

        // GET: api/<OrderReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getordersbyageanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOrdersByAgeAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<OrdersByAgeAndDateDto> orders = _modelService.GetOrdersByAgeAndDate(from, to);
                return Ok(orders);
            }
            return BadRequest();
        }
    }
}
