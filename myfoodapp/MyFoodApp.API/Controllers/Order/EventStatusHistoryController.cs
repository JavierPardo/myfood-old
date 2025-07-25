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
    public class EventStatusHistoryController : ControllerBase
    {
        private readonly IEventStatusHistoryService _eventStatusHistoryService;

        public EventStatusHistoryController(IEventStatusHistoryService eventStatusHistoryService)
        {
            _eventStatusHistoryService = eventStatusHistoryService;

        }

        // GET api/<EventStatusHistoryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public EventStatusHistory GetStatusHistoryByEventId(long id)
        {
            return _eventStatusHistoryService.GetStatusHistoryByEventId(id);
        }

        // POST api/<EventStatusHistoryController>    
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void PostEventStatusHistory([FromBody] EventStatusHistory eventStatusHistory)
        {
            _eventStatusHistoryService.Add(eventStatusHistory);
        }

    }
}
