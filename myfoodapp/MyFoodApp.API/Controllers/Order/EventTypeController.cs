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
    public class EventTypeController : ControllerBase
    {
        private readonly IEventTypeService _eventTypeService;

        public EventTypeController(IEventTypeService eventTypeService)
        {
            _eventTypeService = eventTypeService;

        }

        // GET: api/<EventTypeController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User ")]
        [HttpGet]
        public IEnumerable<EventType> GetEventTypes()
        {
            return _eventTypeService.GetAll();
        }

        // GET api/<EventTypeController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("{id}")]
        public EventType GetByEventTypeId(int id)
        {
            return _eventTypeService.Get(id);
        }

        // POST api/<EventTypeController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddEventType([FromBody] EventType eventType)
        {
            _eventTypeService.Add(eventType);
        }

        // PUT api/<EventTypeController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateEventType([FromBody] EventType eventType)
        {
            _eventTypeService.Update(eventType);
        }

        // DELETE api/<EventTypeController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteEventType(int id)
        {
            _eventTypeService.Delete(id);
        }
    }
}
