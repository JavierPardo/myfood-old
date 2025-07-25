using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReportController : Controller
    {
        private readonly IUserReportService _modelService;
        private readonly IMapper _mapper;

        public UserReportController(IUserReportService modelService,
            IMapper mapper)
        {
            _mapper = mapper;
            _modelService = modelService;
        }

        // GET: api/<UserReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getusersbyzoneanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetUsersByZoneAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<UsersByZoneAndDateDto> users = _modelService.GetUsersByZoneAndDate(from, to);
                return Ok(users);
            }
            return BadRequest();
        }

        // GET: api/<UserReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getusersbygenderanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetUsersByGenderAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<UsersByGenderAndDateDto> users = _modelService.GetUsersByGenderAndDate(from, to);
                return Ok(users);
            }
            return BadRequest();
        }

        // GET: api/<UserReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getusersbyageanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetUsersByAgeAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<UsersByAgeAndDateDto> users = _modelService.GetUsersByAgeAndDate(from, to);
                return Ok(users);
            }
            return BadRequest();
        }
    }
}
