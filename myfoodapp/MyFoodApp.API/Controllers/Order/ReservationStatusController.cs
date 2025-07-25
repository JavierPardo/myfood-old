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
    public class ReservationStatusController : ControllerBase
    {
        private readonly IReservationStatusService _reservationStatusService;

        public ReservationStatusController(IReservationStatusService reservationStatusService)
        {
            _reservationStatusService = reservationStatusService;

        }

        // GET: api/<ReservationStatusController>
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet]
        public IEnumerable<ReservationStatus> GetReservationStatuses()
        {
            return _reservationStatusService.GetAll();
        }

        // GET api/<ReservationStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public ReservationStatus GetByReservationStatusId(int id)
        {
            return _reservationStatusService.Get(id);
        }

        // POST api/<ReservationStatusController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddReservationStatus([FromBody] ReservationStatus reservationStatus)
        {
            _reservationStatusService.Add(reservationStatus);
        }

        // PUT api/<ReservationStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateReservationStatus([FromBody] ReservationStatus reservationStatus)
        {
            _reservationStatusService.Update(reservationStatus);
        }

        // DELETE api/<ReservationStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteReservationStatus(int id)
        {
            _reservationStatusService.Delete(id);
        }
    }
}
