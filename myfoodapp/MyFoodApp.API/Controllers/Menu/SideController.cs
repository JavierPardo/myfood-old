using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SideController : ControllerBase
    {        
        private readonly ISideService _sideService;
        public SideController(ISideService sideService)
        {
            _sideService = sideService;     
        }

        // GET: api/<SideController>
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpGet]
        public IEnumerable<Side> GetSides()
        {
            return _sideService.GetAll();
        }

        // GET api/<SideController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("{id}")]
        public Side GetBySideId(long id)
        {
            return _sideService.Get(id);
        }

        // GET api/<SideController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("IdList")]
        public Side[] GetSideByIdListQuery([FromQuery] string idList)
        {
            if (string.IsNullOrEmpty(idList))
            {
                return new Side[0];
            }
            long[] arrIdList = idList.Split(',').Select(long.Parse).ToArray();
            return _sideService.GetItemsByIds(arrIdList).ToArray();
        }

        // GET api/<SideController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Order/{cryptOrderId}")]
        public Side[] GetSideByOrderId(string cryptOrderId)
        {
            if (string.IsNullOrEmpty(cryptOrderId))
            {
                return new Side[0];
            }
            return _sideService.GetSidesByOrderId(cryptOrderId.DecodeFromBase32String<long>()).ToArray();
        }

        // GET api/<SideController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public Side[] GetSideByEventId(long eventId)
        {
            if (eventId==0)
            {
                return new Side[0];
            }
            return _sideService.GetSidesByEventId(eventId).ToArray();
        }

        // GET api/<SideController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost("IdList")]
        public IEnumerable<Side> GetSideByIdList([FromBody] string idList)
        {
            long[] arrIdList = idList.Split(',').Select(long.Parse).ToArray();
            return _sideService.GetItemsByIds(arrIdList);
        }

        // POST api/<SideController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost]
        public void AddSide([FromBody] Side side)
        {
            _sideService.Add(side);
        }

        // PUT api/<SideController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPatch]
        public void UpdateSide([FromBody] Side side)
        {
            _sideService.Update(side);
        }

        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPatch("UpdateIsActiveSide")]
        public void UpdateIsActiveSide([FromBody] Side side)
        {
            _sideService.UpdateIsActiveFlag(side);
        }

        // DELETE api/<SideController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteSide(long id)
        {
            _sideService.Delete(id);
        }
    }
}
