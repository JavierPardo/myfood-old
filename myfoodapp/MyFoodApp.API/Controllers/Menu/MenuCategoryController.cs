using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using System.Collections;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuCategoryController:ControllerBase
    {
        private readonly IMenusCategoriesService _menusCategoriesService;

        public MenuCategoryController(IMenusCategoriesService menusCategoriesService)
        {
            _menusCategoriesService = menusCategoriesService;
        }


        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("Menu/{menuId}")]
        public IEnumerable GetAllByMenuId(long menuId)
        {
            return _menusCategoriesService.GetAllByMenuId(menuId);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("Category/{categoryId}")]
        public IEnumerable GetAllByCategoryId(long categoryId)
        {
            return _menusCategoriesService.GetAllByCategoryId(categoryId);
        }
    }
}
