using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemReportController : Controller
    {
        private readonly IOrderItemReportService _modelService;

        public OrderItemReportController(IOrderItemReportService modelService)
        {
            _modelService = modelService;
        }

        // GET: api/<OrderReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getorderitemsbydate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOrderItemsByDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                var orderItemsReport = _modelService.GetOrderItemsByDate(from, to);
                return Ok(orderItemsReport);
            }

            return BadRequest();
        }
    }
}
