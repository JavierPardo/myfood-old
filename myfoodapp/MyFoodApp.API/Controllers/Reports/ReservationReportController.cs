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
    public class ReservationReportController : Controller
    {
        private readonly IReservationReportService _modelService;
        private readonly IMapper _mapper;

        public ReservationReportController(IReservationReportService modelService,
            IMapper mapper)
        {
            _mapper = mapper;
            _modelService = modelService;
        }

        // GET: api/<ReservationReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getreservationsbydate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetReservationsByDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                var reservations = _modelService.GetReservationsByDate(from, to);
                return Ok(_mapper.Map<IEnumerable<ReservationsDetailByDateReportDto>>(reservations));
            }
            return BadRequest();
        }

        // GET: api/<ReservationReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getreservationsbyzoneanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetReservationsByZoneAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<ReservationsByZoneAndDateDto> reservations = _modelService.GetReservationsByZoneAndDate(from, to);
                return Ok(reservations);
            }
            return BadRequest();
        }

        // GET: api/<ReservationReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getreservationsbygenderanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetReservationsByGenderAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<ReservationsByGenderAndDateDto> reservations = _modelService.GetReservationsByGenderAndDate(from, to);
                return Ok(reservations);
            }
            return BadRequest();
        }

        // GET: api/<ReservationReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getreservationsbyageanddate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetReservationsByAgeAndDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                IEnumerable<ReservationsByAgeAndDateDto> reservations = _modelService.GetReservationsByAgeAndDate(from, to);
                return Ok(reservations);
            }
            return BadRequest();
        }
    }
}
