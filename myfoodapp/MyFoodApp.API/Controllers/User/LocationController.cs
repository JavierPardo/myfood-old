using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;
        private readonly IEventService _eventService;

        public LocationController(ILocationService locationService, IEventService eventService)
        {
            _locationService = locationService;
            _eventService = eventService;
        }


        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbyuserid/{userId}")]
        public IEnumerable<Location> GetLocationsByUserId(long userId)
        {
            return _locationService.GetLocationsByUserId(userId);
        }

        [Authorize(Roles = "User")]
        [HttpGet("getbyuserid")]
        public IEnumerable<Location> GetByUserId()
        {
            return _locationService.GetByUserId();
        }


        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpGet("GetDeliveryCostByCoordinates")]
        public object GetDeliveryDetails([FromQuery] string lat, [FromQuery] string lng)
        {
            return _locationService.GetDeliveryDetails(lat, lng);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public Location GetByLocationId(long id)
        {
            return _locationService.Get(id);
        }

       

        [Authorize(Roles = "Super Admin")]
        [HttpGet("calculatedeliverycost/{branchid}/{x1}/{y1}/{x2}/{y2}")]
        public decimal GetDeliveryCostByCoordinates(int branchid, decimal x1, decimal y1, decimal x2, decimal y2)
        {
            return 0;
        }

        [Authorize(Roles = "Super Admin, User")]
        [HttpPost]
        public void AddLocation([FromBody] Location location)
        {
            _locationService.Add(location);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateLocation(long id, [FromBody] Location location)
        {
            _locationService.Update(location);
        }

        [Authorize(Roles = "Super Admin, Admin, User")]
        [HttpGet("Event/{eventId}")]
        public IActionResult GetLocationByEventId(long eventId)
        {
            return Ok(_eventService.Get(eventId).DestinationLocation);
        }

        [Authorize(Roles = "Super Admin, User")]
        [HttpDelete("{id}")]
        public void DeleteLocation(long id)
        {
            _locationService.Delete(id);
        }
    }
}