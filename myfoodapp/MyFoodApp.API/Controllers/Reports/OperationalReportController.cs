using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationalReportController : Controller
    {
        private readonly IOperationalReportService _modelService;

        public OperationalReportController(IOperationalReportService modelService)
        {
            _modelService = modelService;
        }

        // GET: api/<OperationalReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getoperationalbydate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOperationalByDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
                return Ok(_modelService.GetOperationalByDate(from, to));

            return BadRequest();
        }

        // GET: api/<OperationalReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getoperationaltimesbydate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetOperationalTimesByDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
                return Ok(_modelService.GetOperationalTimesByDate(from, to));

            return BadRequest();
        }
    }
}
