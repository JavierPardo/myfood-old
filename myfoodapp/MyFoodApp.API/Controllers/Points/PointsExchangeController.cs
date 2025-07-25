using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsExchangeController:ControllerBase
    {
        private readonly IPointsExchangeService _pointsExchangeService;

        public PointsExchangeController(IPointsExchangeService pointsExchangeService)
        {
            _pointsExchangeService = pointsExchangeService;
        }

        // GET: api/<CouponController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet]
        public IEnumerable<PointsExchange> GetPointsExchange()
        {
            return _pointsExchangeService.GetAll();
        }

        // GET api/<CouponController>/getcurrent
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("getcurrent")]
        public IActionResult GetCurrentPointsExchange()
        {
            return Ok(_pointsExchangeService.GetCurrentPointsExchange());
        }

        // POST api/<CouponController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddPointsExchange([FromBody] PointsExchange pointsExchange)
        {
            _pointsExchangeService.Add(pointsExchange);
        }

        // PUT api/<CouponController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut]
        public void UpdatePointsExchange([FromBody] PointsExchange pointsExchange)
        {
            _pointsExchangeService.Update(pointsExchange);
        }


        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("toggleActive")]
        public void PatchPointsExchange([FromBody] PointsExchange pointsExchange)
        {
            _pointsExchangeService.UpdateActiveFlag(pointsExchange);
        }
    }
}
