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
    public class CouponController:ControllerBase
    {
        private readonly ICouponService _couponService;

        public CouponController(ICouponService couponService)
        {
            _couponService = couponService;
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("metadata")]
        public IActionResult GetMetadata()
        {
            return Ok(_couponService.GetMetadata());
        }

        // GET: api/<CouponController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet]
        public IEnumerable<Coupon> GetCoupons()
        {
            return _couponService.GetAll();
        }

        // GET api/<CouponController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("{cryptId}")]
        public Coupon GetByCouponId(string cryptId)
        {
            return _couponService.Get(cryptId.DecodeFromBase32String<long>());
        }

        // GET api/<CouponController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Code")]
        public Coupon GetByCode([FromQuery] string code)
        {
            return _couponService.GetByCode(new Coupon { Code = code });
        }

        // GET api/<CouponController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public Coupon GetCouponByEventId(long eventId)
        {
            return _couponService.GetByEventId(eventId);
        }

        // POST api/<CouponController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddCoupon([FromBody] Coupon Coupon)
        {
            _couponService.Add(Coupon);
        }

        // PUT api/<CouponController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut]
        public void UpdateCoupon([FromBody] Coupon Coupon)
        {
            _couponService.Update(Coupon);
        }

        // DELETE api/<CouponController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{cryptId}")]
        public void DeleteCoupon(string cryptId)
        {
            _couponService.Delete(cryptId.DecodeFromBase32String<long>());
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("toggleActive")]
        public void PatchCoupon([FromBody] Coupon coupon)
        {
            _couponService.UpdateActiveFlag(coupon);
        }
    }
}
