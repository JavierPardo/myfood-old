using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbyuserid/{userId}")]
        public IEnumerable<Favorite> GetFavoritesByUserId(long userId)
        {
            return _favoriteService.GetFavoritesByUserId(userId);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public Favorite GetByFavoriteId(long id)
        {
            return _favoriteService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddFavorite([FromBody] Favorite favorite)
        {
            _favoriteService.Add(favorite);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateFavorite(long id, [FromBody] Favorite favorite)
        {
            _favoriteService.Update(favorite);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteFavorite(long id)
        {
            _favoriteService.Delete(id);
        }
    }
}