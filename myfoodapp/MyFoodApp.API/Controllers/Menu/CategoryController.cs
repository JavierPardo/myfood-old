using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _mapper = mapper;
            _categoryService = categoryService;
        }

        // GET: api/<CategoryController>/getbymenuid/1
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("getbymenuid/{menuId}")]
        public IEnumerable<Category> GetCategoriesByMenuId(long menuId)
        {
            return _categoryService.GetByMenuId(menuId);
        }

        // GET api/<CategoryController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("{id}")]
        public Category GetByCategoryId(long id)
        {
            return _categoryService.Get(id);
        }

        // GET api/<CategoryController>
        [Authorize(Roles = "Super Admin, Admin, Employee, User")]
        [HttpGet]
        public IEnumerable<Category> GetCategories()
        {
            return _categoryService.GetAll();
        }

        // POST api/<CategoryController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddCategory([FromBody] CategoryDto category)
        {
            _categoryService.Add(_mapper.Map<Category>(category));
        }

        // PUT api/<CategoryController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut("{id}")]
        public void UpdateCategory([FromBody] Category category)
        {
            _categoryService.Update(category);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("{id}")]
        public void Patch(long id, [FromBody] CategoryDto category)
        {
            _categoryService.UpdateSome(category, id);
        }

        // DELETE api/<CategoryController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteCategory(long id)
        {
            _categoryService.Delete(id);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("rearrange")]
        public void Rearrange([FromBody] string categories)
        {
            _categoryService.Rearrangement(JsonConvert.DeserializeObject<Category[]>(categories));
        }
    }
}