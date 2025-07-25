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
    public class SidePriceHistoryController : ControllerBase
    {
        private readonly ISidePriceHistoryService _sidePriceHistoryService;
        public SidePriceHistoryController(ISidePriceHistoryService sidePriceHistoryService)
        {
            _sidePriceHistoryService = sidePriceHistoryService;
        }

        // GET api/<SidePriceHistoryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public SidePriceHistory GetPriceHistoryBySideId(long id)
        {
            return _sidePriceHistoryService.Get(id);
        }

        // POST api/<SidePriceHistoryController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddSidePriceHistory([FromBody] SidePriceHistory sidePriceHistory)
        {
            _sidePriceHistoryService.Add(sidePriceHistory);
        }

    }
}
