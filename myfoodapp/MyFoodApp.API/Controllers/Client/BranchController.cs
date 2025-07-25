using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Exception;
using MyFoodApp.API.Infrastructure.Extension;
using System.Net;
using System.Collections;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IBranchService _branchService;
        public BranchController(IBranchService branchService)
        {
            _branchService = branchService;
        }

        // GET: api/<BranchController>
        [HttpGet]
        public IEnumerable<Branch> GetBranches()
        {
            return _branchService.GetAllWithClients();
        }

        // GET: api/<BranchController>
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("client/{encryptedClientId}")]
        public IEnumerable<Branch> GetBranchesByEncryptedClientId(string encryptedClientId)
        {
            return _branchService.GetAllByClientId(encryptedClientId.DecodeFromBase32String<int>());
        }

        // GET api/<BranchController>/getbyclientid/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbyclientid/{clientId}")]
        public IEnumerable<Branch> GetBranchesByClientId(int clientId)
        {
            return _branchService.GetAllByClientId(clientId);
        }

        // GET api/<BranchController>/getbygroupid/5
        [Authorize(Roles = "User, Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbygroupid/{groupId}")]
        public IEnumerable<Branch> GetBranchesByGroupId(int groupId)
        {
            return _branchService.GetAllByGroupId(groupId);
        }

        // GET api/<BranchController>/getbyeventtypeid/5
        [Authorize(Roles = "User, Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbyeventtypeid/{cryptEventTypeId}")]
        public IEnumerable<Branch> GetBranchesByEventTypeId(string cryptEventTypeId, [FromQuery] string searchCriteria, [FromQuery] int branchGroupId)
        {
            return _branchService.GetAllByEventTypeId(cryptEventTypeId.DecodeFromBase32String<int>(),branchGroupId);
        }

        // GET api/<BranchController>/getbytags/searchCriteria
        [Authorize(Roles = "User, Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getbytags")]
        public IEnumerable<Branch> GetBranchByNameOrTags([FromQuery] string searchCriteria)
        {
            return _branchService.GetAllByNameOrTags(searchCriteria);
        }

        // GET api/<BranchController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("{cryptId}")]
        public Branch GetByBranchId(string cryptId)
        {
            return _branchService.Get(cryptId.DecodeFromBase32String<int>());
        }


        // GET api/<ClientController>/5
        [HttpGet("Information")]
        public IActionResult GetInformation()
        {
            var branch = _branchService.GetCurrent();
            if (branch == null)
            {
                throw new ApiException(HttpStatusCode.NotFound);
            }
            return Ok(branch);
        }


        // GET api/<ClientController>/5
        [HttpGet("ServiceTag")]
        public IActionResult GetBranchesByServiceType([FromQuery] string tags)
        {
            var branch = _branchService.GetAllByTags(tags.Split(','));
            if (branch == null)
            {
                throw new ApiException(HttpStatusCode.NotFound);
            }
            return Ok(branch);
        }

        // GET api/<ClientController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("Current")]
        public IActionResult GetCurrent()
        {
            var branch = _branchService.GetCurrent();           
            return Ok(branch);
        }


        // GET api/<ClientController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut("Information")]
        public IActionResult SaveInformation([FromBody] BranchDto model)
        {
            _branchService.SaveInformation(model);
            return Ok();
        }

        // POST api/<BranchController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddBranch([FromBody] Branch branch)
        {
            _branchService.Add(branch);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut]
        public void UpdateBranchSuperAdmin([FromBody] Branch branch)
        {
            _branchService.Update(branch);
        }

        //[Authorize(Roles = "User")]
        [HttpGet("Search")]
        public IEnumerable GetBranchesByEventTypesAndCriteria([FromQuery] string criteria = "", [FromQuery(Name = "eventtypes")] string eventTypeList = "")
        {
            return _branchService.GetAllByEvetTypesAndCriteria(criteria, eventTypeList);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPatch("UpdateIsActiveBranch")]
        public void UpdateIsActiveBranch([FromBody] Branch branch)
        {
            _branchService.UpdateIsActive(branch);
        }

        // DELETE api/<BranchController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete]
        public void DeleteBranch([FromBody] Branch branch)
        {
            _branchService.Delete(branch.Id);
        }
    }
}
