using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptionController : ControllerBase
    {
        private readonly IOptionService _optionService;
        public OptionController(IOptionService optionService)
        {
            _optionService = optionService;
        }

        // GET: api/<OptionController>
        [Authorize(Roles = "Super Admin, Admin, Employee, User")]
        [HttpGet]
        public IEnumerable<Option> GetOptions()
        {
            return _optionService.GetAll();
        }

        // GET api/<OptionController>/getbyitemid/1
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("getbyitemid/{itemId}")]
        public IEnumerable<Option> GetOptionsByItemId(long itemId)
        {
            return _optionService.GetByItem(itemId);
        }

        // GET api/<OptionController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("{id}")]
        public Option GetByOptionId(long id)
        {
            return _optionService.Get(id);
        }

        // GET api/<OptionController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("IdList")]
        public Option[] GetOptionByIdList([FromQuery] string idList)
        {
            if(string.IsNullOrEmpty(idList))
            {
                return new Option[0];
            }
            long[] arrIdList = idList.Split(',').Select(long.Parse).ToArray();
            return _optionService.GetByIdList(arrIdList).ToArray();
        }

        // GET api/<OptionController>/Item/5
        [Authorize(Roles = "Super Admin, Admin, Employee, User")]
        [HttpGet("Item/{itemId}")]
        public ICollection<Option> GetOptionByItem(long itemId)
        {
            return _optionService.GetByItem(itemId);
        }

        // GET api/<OptionController>/Item/5
        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("Order/{cryptOrderId}")]
        public ICollection<Option> GetOptionByOrderId(string cryptOrderId)
        {
            return _optionService.GetOptionsByOrderId(cryptOrderId.DecodeFromBase32String<long>());
        }

        // GET api/<OptionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost("IdList")]
        public ICollection<Option> GetByIdList(string idList)
        {
            return _optionService.GetByIdList(idList.Split(',').Select(x=>x.DecodeFromBase32String<long>()));
        }

        // POST api/<OptionController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddOption([FromBody] Option option)
        {
            _optionService.Add(option);
        }

        // PUT api/<OptionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut]
        public void UpdateOption([FromBody] Option option)
        {
            _optionService.Update(option);
        }

        // DELETE api/<OptionController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteOption(long id)
        {
            _optionService.Delete(id);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("{id}")]
        public void PatchOption(long id, [FromBody] OptionDto optionDTO)
        {
            _optionService.UpdateSome(optionDTO, id);
            
        }
    }
}
