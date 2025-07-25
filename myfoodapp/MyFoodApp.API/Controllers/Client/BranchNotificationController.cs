using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Services.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchNotificationController : ControllerBase
    {
        private readonly IBranchNotificationService _branchNotificationService;
        private readonly IBranchNotificationTypesService _branchNotificationTypesService;
        private readonly IMapper _mapper;

        public BranchNotificationController(IBranchNotificationService branchNotificationService, IBranchNotificationTypesService branchNotificationTypesService, IMapper mapper)
        {
            _branchNotificationService = branchNotificationService;
            _branchNotificationTypesService = branchNotificationTypesService;
            _mapper = mapper;
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("notifications")]
        public IActionResult GetBranchesByEncryptedClientId()
        {
            ICollection<BranchNotification> branchNotifications = _branchNotificationService.GetUnseen();
            return Ok(_mapper.Map<ICollection<BranchNotificationsDto>>(branchNotifications));
            
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPatch("notifications/seen/{id}")]
        public IActionResult MarkAsSeen(int id)
        {
            try
            {
                if(id != null)
                {
                _branchNotificationService.MarkAsSeen(id);
                return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }
    }
}
