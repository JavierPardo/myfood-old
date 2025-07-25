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
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;
        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        // GET: api/<CountryController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet]
        public IEnumerable<Country> GetCountries()
        {
            return _countryService.GetAll();
        }

        // GET api/<CountryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public Country GetByCountryId(int id)
        {
            return _countryService.Get(id);
        }

        // POST api/<CountryController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddCountry([FromBody] Country country)
        {
            _countryService.Add(country);
        }

        // PUT api/<CountryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateCountry([FromBody] Country country)
        {
            _countryService.Update(country);
        }

        // DELETE api/<CountryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteCountry(int id)
        {
            _countryService.Delete(id);
        }
    }
}
