using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        // GET api/<MenuController>/getbybranchid/1
        [HttpGet("getbybranchid/{branchId}")]
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        public IEnumerable<Menu> GetMenuByBranchId(int branchId)
        {
            return _menuService.GetMenuByBranchId(branchId);
        }

        // GET api/<MenuController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        public Menu GetByMenuId(long id)
        {
            return _menuService.Get(id);
        }

        // GET api/<MenuController>
        [HttpGet]
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        public IEnumerable<Menu> GetAllMenus()
        {
            return _menuService.GetAll();
        }

        // POST api/<MenuController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddMenu([FromBody] Menu menu)
        {
            _menuService.Add(menu);
        }

        // PUT api/<MenuController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut]
        public void UpdateMenu([FromBody] Menu menu)
        {
            _menuService.Update(menu);
        }

        // DELETE api/<MenuController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteMenu(long id)
        {
            _menuService.Delete(id);
        }


        [HttpPatch("{id}")]
        [Authorize(Roles = "Super Admin, Admin")]
        public void MenuPatch(long id, [FromBody] MenuPatchDto menu)
        {
            _menuService.UpdateSome(menu,id);
        }
    }
}
