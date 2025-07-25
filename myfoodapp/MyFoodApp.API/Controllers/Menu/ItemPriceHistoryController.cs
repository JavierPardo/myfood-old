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
    public class ItemPriceHistoryController : ControllerBase
    {
        private readonly IItemPriceHistoryService _itemPriceHistoryService;
        public ItemPriceHistoryController(IItemPriceHistoryService itemPriceHistoryService)
        {
            _itemPriceHistoryService = itemPriceHistoryService;
        }

        // GET api/<ItemPriceHistoryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public ItemPriceHistory GetPriceHistoryByItemId(long id)
        {
            return _itemPriceHistoryService.GetPriceHistoryByItemId(id);
        }

        // POST api/<ItemPriceHistoryController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddItemPriceHistory([FromBody] ItemPriceHistory itemPriceHistory)
        {
            _itemPriceHistoryService.Add(itemPriceHistory);
        }
      
    }
}
