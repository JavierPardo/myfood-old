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
    public class BranchPreferenceController : ControllerBase
    {
        private readonly IBranchPreferenceService _branchPreferenceService;
        public BranchPreferenceController(IBranchPreferenceService branchPreferenceService)
        {
            _branchPreferenceService = branchPreferenceService;
        }

        // GET: api/<BranchPreferenceController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpGet("{id}")]
        public IEnumerable<BranchPreferences> GetBranchPreferencesByBranchId(int id)
        {
            return _branchPreferenceService.GetByBranchId(id);
        }

        // GET: api/<BranchPreferenceController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpGet]
        public IEnumerable<BranchPreferences> GetBranchPreferences()
        {
            return _branchPreferenceService.GetAll();
        }

        // GET api/<BranchPreferenceController>/5/mysamplepreference
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpGet("{id}/{name}")]
        public BranchPreferences GetBranchPreferencesByBranchIdAndName(int id, string name)
        {
            return _branchPreferenceService.GetByBranchIdAndName(id, name);
        }

        // POST api/<BranchPreferenceController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddBranchPreferences([FromBody] BranchPreferences branchPreferences)
        {
            _branchPreferenceService.Add(branchPreferences);
        }

        // PUT api/<BranchPreferenceController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut]
        public void UpdateBranchPreferences([FromBody] BranchPreferences branchPreferences)
        {
            _branchPreferenceService.Update(branchPreferences);
        }

        // DELETE api/<BranchPreferenceController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteBranchPreferences(int id)
        {
            _branchPreferenceService.Delete(id);
        }

    }
}
