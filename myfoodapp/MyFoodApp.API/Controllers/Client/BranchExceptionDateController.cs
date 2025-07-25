using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchExceptionDateController : ControllerBase
    {
        private readonly IBranchExceptionDateService _branchExceptionDateService;
        private readonly IMapper _mapper;

        public BranchExceptionDateController(IBranchExceptionDateService branchExceptionDateService, IMapper mapper)
        {
            _mapper = mapper;
            _branchExceptionDateService = branchExceptionDateService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public IEnumerable<BranchExceptionDate> GetBranchExceptionDate(int branchId)
        {
            return _branchExceptionDateService.GetAllByBranchId(branchId);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("{id}")]
        public BranchExceptionDate GetByBranchExceptionDateId(int id)
        {
            return _branchExceptionDateService.Get(id);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet]
        public IEnumerable<BranchExceptionDate> GetAll()
        {
            return _branchExceptionDateService.GetAll();
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPost]
        public void AddBranchExceptionDate([FromBody] BranchExceptionDate branchExceptionDate)
        {
            _branchExceptionDateService.Add(branchExceptionDate);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPut]
        public void UpdateBranchExceptionDate([FromBody] BranchExceptionDate branchExceptionDate)
        {
            _branchExceptionDateService.Update(branchExceptionDate);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPatch("UpdateIsClosed")]
        public void UpdateBranchExceptionDateIsClosed([FromBody] BranchExceptionDate branchExceptionDate)
        {
            _branchExceptionDateService.UpdateIsClosed(branchExceptionDate);
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpDelete("{id}")]
        public void DeleteBranchExceptionDate(int id)
        {
            _branchExceptionDateService.Delete(id);
        }
    }
}
