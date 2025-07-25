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
    public class BranchPaymentTypeController : ControllerBase
    {
        private readonly IBranchPaymentTypeService _branchPaymentTypeService;
        public BranchPaymentTypeController(IBranchPaymentTypeService branchService)
        {
            _branchPaymentTypeService = branchService;
        }

        // GET: api/<BranchPaymentTypeController>
        [Authorize(Roles = "Super Admin")]
        [HttpGet]
        public IEnumerable<BranchesPaymentTypes> GetBranchPaymentTypes()
        {
            return _branchPaymentTypeService.GetAll();
        }

        // GET api/<BranchPaymentTypeController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public BranchesPaymentTypes GetByBranchPaymentTypeId(int id)
        {
            return _branchPaymentTypeService.Get(id);
        }

        // POST api/<BranchPaymentTypeController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddBranchPaymentType([FromBody] BranchesPaymentTypes branchesPaymentTypes)
        {
            _branchPaymentTypeService.Add(branchesPaymentTypes);
        }

        // PUT api/<BranchPaymentTypeController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateBranchPaymentType([FromBody] BranchesPaymentTypes branchesPaymentTypes)
        {
            _branchPaymentTypeService.Update(branchesPaymentTypes);
        }

        // DELETE api/<BranchPaymentTypeController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteBranchPaymentType(int id)
        {
            _branchPaymentTypeService.Delete(id);
        }
    }
}
