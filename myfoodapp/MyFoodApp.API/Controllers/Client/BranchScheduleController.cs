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
    public class BranchScheduleController : ControllerBase
    {
        private readonly IBranchScheduleService _branchScheduleService;
        private readonly IBranchExceptionDateService _branchExceptionDateService;
        private readonly IMapper _mapper;

        public BranchScheduleController(IBranchScheduleService branchScheduleService,
            IBranchExceptionDateService branchExceptionDateService, IMapper mapper)
        {
            _mapper = mapper;
            _branchScheduleService = branchScheduleService;
            _branchExceptionDateService = branchExceptionDateService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public IEnumerable<BranchSchedule> GetBranchSchedule(int branchId)
        {
            return _branchScheduleService.GetAllByBranchId(branchId);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbybranchanddate/{branchId}/{strDate}")]
        public IEnumerable<BranchDateScheduleDto> GetBranchScheduleByDate(int branchId, string strDate)
        {
            IEnumerable<BranchExceptionDate> exceptionDates = _branchExceptionDateService.GetByBranchAndDate(branchId, strDate);
            if (exceptionDates.Count() > 0) //if the date is in the exceptions table
            {
                return _mapper.Map<IEnumerable<BranchDateScheduleDto>>(exceptionDates);
            }
            return _mapper.Map<IEnumerable<BranchDateScheduleDto>>(_branchScheduleService.GetByBranchAndDate(branchId, strDate));
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public BranchSchedule GetByBranchScheduleId(int id)
        {
            return _branchScheduleService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddBranchSchedule([FromBody] BranchSchedule branchSchedule)
        {
            _branchScheduleService.Add(branchSchedule);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateBranchSchedule([FromBody] BranchSchedule branchSchedule)
        {
            _branchScheduleService.Update(branchSchedule);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteBranchSchedule(int id)
        {
            _branchScheduleService.Delete(id);
        }
    }
}
