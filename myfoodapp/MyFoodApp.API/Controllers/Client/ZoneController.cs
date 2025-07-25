using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZoneController : ControllerBase
    {
        private readonly IZoneService _zoneService;
        public ZoneController(IZoneService zoneService)
        {
            _zoneService = zoneService;
        }

        // GET: api/<ZoneController>
        [HttpGet]
        public IEnumerable<Zone> GetZones()
        {
            return _zoneService.GetAll();
        }

        // GET api/<ZoneController>/5
        [HttpGet("{id}")]
        public Zone GetByZoneId(int id)
        {
            return _zoneService.GetById(id);
        }

        // POST api/<ZoneController>
        [HttpPost]
        public void AddZone([FromBody] Zone zone)
        {
            _zoneService.Add(zone);
        }

        // PUT api/<ZoneController>/5
        [HttpPut]
        public void UpdateZone([FromBody] Zone zone)
        {
            _zoneService.Update(zone);
        }

        // DELETE api/<ZoneController>/5
        [HttpDelete("{id}")]
        public void DeleteZone(int id)
        {
            _zoneService.Delete(id);
        }
    }
}