using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Infrastructure.Exception;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting, User")]
        [HttpGet]
        public IEnumerable<Item> GetItems()
        {
            return _itemService.GetAll();

        }

        // GET api/<ItemController>/getbybranchid/1
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting, User")]
        [HttpGet("getbybranchid/{cryptBranchId}")]
        public IEnumerable<Item> GetItemsByBranchId(string cryptBranchId)
        {
            return _itemService.GetItemsByBranchId(cryptBranchId.DecodeFromBase32String<int>());
        }

        // GET api/<ItemController>/getbymenuid/1
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbymenuid/{menuId}")]
        public IEnumerable<Item> GetItemsByMenuId(long menuId) => _itemService.GetItemsByMenuId(menuId);

        // GET api/<ItemController>/getbycategoryid/1
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbycategoryid/{categoryId}")]
        public IEnumerable<Item> GetItemsByCategoryId(long categoryId)
        {
            return _itemService.GetItemsByCategoryId(categoryId);
        }

        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting, User")]
        [HttpGet("{id}")]
        public Item GetByItemId(long id)
        {
            return _itemService.Get(id);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getwithrelations/{id}")]
        public Item GetByItemIdWithRelations(long id)
        {
            return _itemService.GetWithRelations(id);
        }

        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("Event/{eventId}")]
        public Item[] GetItemsByEventId(long eventId)
        {
            if (eventId==0)
            {
                return new Item[0];
            }
            return _itemService.GetItemsByEventId(eventId).ToArray();
        }

        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("Order/{cryptOrderId}")]
        public Item[] GetItemsByOrderId(string cryptOrderId)
        {
            if (string.IsNullOrWhiteSpace(cryptOrderId))
            {
                return new Item[0];
            }
            return _itemService.GetItemsByOrderId(cryptOrderId.DecodeFromBase32String<long>()).ToArray();
        }

        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("Search/{menu}/{category}")]
        public IEnumerable<Item> GetFilteredItems(long menu, long category, [FromQuery] string query)
        {
            return _itemService.GetFilteredItems(menu, category, query);
        }

        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("IdList")]
        public Item[] GetItemsByListQuery([FromQuery] string idList)
        {
            if (string.IsNullOrWhiteSpace(idList))
            {
                return new Item[0];
            }
            long[] arrIdList = idList.Split(',').Select(long.Parse).ToArray();
            return _itemService.GetItemsByIds(arrIdList).ToArray();
        }

        // GET api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("{menu}/{category}")]
        public IEnumerable<Item> GetItemByMenuAndCategory(int menu, int category, [FromQuery] string query)
        {
            return _itemService.GetFilteredItems(menu, category, query);
        }

        // POST api/<ItemController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddItem([FromBody] Item item)
        {
            _itemService.Add(item);
        }

        // PUT api/<ItemController>/      
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut]
        public void UpdateItem([FromBody] Item item)
        {
            _itemService.Update(item);
        }

        // DELETE api/<ItemController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteItem(long id)
        {
            _itemService.Delete(id);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("{id}")]
        public void PatchItem(long id, [FromBody] ItemDto itemDto)
        {
            _itemService.UpdateSome(itemDto, id);            
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("rearrange")]
        public void RearrangeItem([FromBody] string items)
        {
            _itemService.Rearrange(JsonConvert.DeserializeObject<Item[]>(items));
        }
    }
}
