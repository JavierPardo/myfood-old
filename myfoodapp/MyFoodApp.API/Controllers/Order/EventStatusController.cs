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
    public class EventStatusController : ControllerBase
    {
        private readonly IEventStatusService _eventStatusService;

        public EventStatusController(IEventStatusService eventStatusService)
        {
            _eventStatusService = eventStatusService;

        }

        // GET: api/<EventStatusController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpGet]
        public IEnumerable<EventStatus> GetEventStatuses()
        {
            return _eventStatusService.GetAll();
        }

        // GET api/<EventStatusController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("{id}")]
        public EventStatus GetByEventStatusId(int id)
        {
            return _eventStatusService.Get(id);
        }

        // POST api/<EventStatusController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddEventStatus([FromBody] EventStatus eventStatus)
        {
            _eventStatusService.Add(eventStatus);
        }

        // PUT api/<EventStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateEventStatus([FromBody] EventStatus eventStatus)
        {
            _eventStatusService.Update(eventStatus);
        }

        // DELETE api/<EventStatusController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteEventStatus(int id)
        {
            _eventStatusService.Delete(id);
        }
    }
}
