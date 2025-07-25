using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }


        // GET: api/<GroupController>
        [Authorize(Roles = "Super Admin,User")]
        [HttpGet]
        public IEnumerable<Group> GetGroups()
        {
            return _groupService.GetAll();
        }

        // GET api/<GroupController>/5
        [Authorize(Roles = "Super Admin,User")]
        [HttpGet("{id}")]
        public Group GetByGroupId(int id)
        {
            return _groupService.Get(id);
        }

        // POST api/<GroupController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddGroup([FromBody] Group client)
        {
            _groupService.Add(client);
        }

        // PUT api/<GroupController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateGroup([FromBody] Group client)
        {
            _groupService.Update(client);
        }

        // DELETE api/<GroupController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteGroup(int id)
        {
            _groupService.Delete(id);
        }
    }
}
