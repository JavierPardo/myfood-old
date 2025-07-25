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
    public class ImageCollectionController : ControllerBase
    {
        private readonly IImageCollectionService _imageCollectionService;
        public ImageCollectionController(IImageCollectionService imageCollectionService)
        {
            _imageCollectionService = imageCollectionService;
        }

        // GET: api/<ImageCollectionController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpGet]
        public IEnumerable<ImageCollection> GetCollections()
        {
            return _imageCollectionService.GetAll();
        }

        // GET api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpGet("{id}")]
        public ImageCollection GetCollectionById(int id)
        {
            return _imageCollectionService.Get(id);
        }

        // POST api/<ImageCollectionController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddCollection([FromBody] ImageCollection collection)
        {
            _imageCollectionService.Add(collection);
        }

        // PUT api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateCollection([FromBody] ImageCollection collection)
        {
            _imageCollectionService.Update(collection);
        }

        // DELETE api/<ImageCollectionController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteCollection(int id)
        {
            _imageCollectionService.Delete(id);
        }
    }
}
