using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationStatusHistoryController : ControllerBase
    {
        private readonly IReservationStatusHistoryService _reservationStatusHistoryService;

        public ReservationStatusHistoryController(IReservationStatusHistoryService reservationStatusHistoryService)
        {
            _reservationStatusHistoryService = reservationStatusHistoryService;

        }

        // GET api/<ReservationStatusHistoryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public ReservationStatusHistory GetByReservationStatusHistoryId(long id)
        {
            return _reservationStatusHistoryService.Get(id);
        }

        // POST api/<ReservationStatusHistoryController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddReservationStatusHistory([FromBody] ReservationStatusHistory reservationStatusHistory)
        {
            _reservationStatusHistoryService.Add(reservationStatusHistory);
        }

    }
}
