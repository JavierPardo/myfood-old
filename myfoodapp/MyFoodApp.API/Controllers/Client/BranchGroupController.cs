using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Services;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchGroupController : ControllerBase
    {
        private readonly IBranchGroupService _branchGroupService;

        public BranchGroupController(IBranchGroupService branchGroupService)
        {
            _branchGroupService = branchGroupService;
        }

        [HttpGet("{groupId}")]
        public IActionResult GetBranchGroupByGroupId(int groupId)
        {
            return Ok(_branchGroupService.GetByGroupId(groupId));
        }

        [HttpGet]
        public IActionResult GetAllBranchGroups()
        {
            return Ok(_branchGroupService.GetAll());
        }
        [HttpPost]
        public IActionResult PostBranchGroup(BranchesGroups branchesGroups)
        {
            _branchGroupService.Create(branchesGroups);
            return Ok(branchesGroups);
        }

        [HttpPut]
        public IActionResult PutBranchGroup(BranchesGroups branchesGroups)
        {
            _branchGroupService.Update(branchesGroups);
            return Ok(branchesGroups);
        }

        [HttpDelete]
        public IActionResult DeleteBranchGroup(BranchesGroups branchesGroups)
        {
            _branchGroupService.Delete(branchesGroups);
            return Ok();
        }
    }
}
