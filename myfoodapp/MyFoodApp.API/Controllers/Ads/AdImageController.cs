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
    public class AdImageController : ControllerBase
    {
        private readonly IAdImageService _adImageService;
        public AdImageController(IAdImageService adImageService)
        {
            _adImageService = adImageService;
        }

        // GET: api/<ImageCollectionController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpGet("getimagebycollection/{id}")]
        public IEnumerable<AdImage> GetAdImagesByCollection(int id)
        {
            return _adImageService.GetAdImagesByCollection(id);
        }

        // GET api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpGet("{id}")]
        public AdImage GetAdImageById(int id)
        {
            return _adImageService.Get(id);
        }

        // POST api/<ImageCollectionController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddAdImage([FromBody] AdImage image)
        {
            _adImageService.Add(image);
        }

        // PUT api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut("{id}")]
        public void UpdateAdImage([FromBody] AdImage image)
        {
            _adImageService.Update(image);
        }

        // DELETE api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteAdImage(int id)
        {
            _adImageService.Delete(id);
        }
    }
}
