using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationSpecialEventsController : ControllerBase
    {
        private readonly IReservationSpecialEventService _reservationSpecialEventService;
        public ReservationSpecialEventsController(IReservationSpecialEventService reservationSpecialEventService)
        {
            _reservationSpecialEventService = reservationSpecialEventService;
        }

        // GET: api/<ReservationSpecialEventController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet]
        public IEnumerable<ReservationSpecialEvent> GetSpecialEvents(bool activesOnly)
        {
            return _reservationSpecialEventService.GetAll(activesOnly);
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("future")]
        public IEnumerable<ReservationSpecialEvent> GetFutureSpecialEvents()
        {
            return _reservationSpecialEventService.GetFutureEvents();
        }

        // GET api/<ReservationSpecialEventController>/getbybranchid/1
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public ReservationSpecialEvent GetSpecialEventsByBranchId(int branchId)
        {
            return _reservationSpecialEventService.GetSpecialEventsByBranchId(branchId);
        }

        // GET api/<ReservationSpecialEventController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpGet("{id}")]
        public ReservationSpecialEvent GetBySpecialEventId(long id)
        {
            return _reservationSpecialEventService.Get(id);
        }

        // POST api/<ReservationSpecialEventController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost]
        public void AddSpecialEvent([FromBody] ReservationSpecialEvent reservationSpecialEvent)
        {
            _reservationSpecialEventService.Add(reservationSpecialEvent);
        }

        // PUT api/<ReservationSpecialEventController>/5
        [HttpPut]
        public void UpdateSpecialEvent([FromBody] ReservationSpecialEvent reservationSpecialEvent)
        {
            _reservationSpecialEventService.Update(reservationSpecialEvent);
        }

        // DELETE api/<ReservationSpecialEventController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpDelete("{id}")]
        public void DeleteSpecialEvent(int id)
        {
           _reservationSpecialEventService.Delete(id);
        }

        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPatch("toggleActive")]
        public void UpdateIsActiveSpecialEvent([FromBody] ReservationSpecialEvent ReservationSpecialEvent)
        {
            _reservationSpecialEventService.UpdateIsActiveFlag(ReservationSpecialEvent);
        }
    }
}