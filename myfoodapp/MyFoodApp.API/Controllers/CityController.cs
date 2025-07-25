using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityService _cityService;
        public CityController(ICityService cityService)
        {
            _cityService = cityService;
        }

        // GET: api/<CityController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet]
        public IEnumerable<City> GetCities()
        {
            return _cityService.GetAll();
        }

        // GET api/<CityController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public City GetByCityId(int id)
        {
            return _cityService.Get(id);
        }

        // POST api/<CityController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddCity([FromBody] City city)
        {
            _cityService.Add(city);
        }

        // PUT api/<CityController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateCity([FromBody] City city)
        {
            _cityService.Update(city);
        }

        // DELETE api/<CityController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteCity(int id)
        {
            _cityService.Delete(id);
        }
    }
}
