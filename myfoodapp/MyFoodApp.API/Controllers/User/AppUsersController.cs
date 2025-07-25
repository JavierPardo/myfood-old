using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Models;
using MyFoodApp.API.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using AutoMapper;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Models.User;

namespace MyFoodApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppUsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public AppUsersController(IUserService userService, IUserSession userSession, IMapper mapper)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthenticateModel model)
        {
            var tokenUser=  await _userService.Authenticate(model.Email, model.Password);
            return Ok(tokenUser);
        }


        // GET api/<OrderStatusHistoryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("Order")]
        public IActionResult GetUsersByOrderId([FromBody] long orderId)
        {
            return Ok(_mapper.Map<IEnumerable<AppUserModel>>(_userService.GetAllByOrderId(orderId)));
        }

        [HttpPost("register")]
        public async Task<object> RegisterUser([FromBody] RegisterModel model)
        {
            return await _userService.RegisterUser(model);
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpGet("currentUser")]
        public async Task<WebUserDto> GetCurrentUser()
        {
            return await _userService.GetCurrentUser();
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpGet("mobileuserprofile")]
        public AppUserModel GetMobileUserProfile()
        {
            return _userService.GetMobileUserProfile();
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet]
        public async Task<IActionResult> GetUsersAsync()
        {
            return Ok(await _userService.GetAllAsync());
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getadminsbybranchid/{branchId}")]
        public IActionResult GetAdminUsersByBranchId(int branchId)
        {
            return Ok(_userService.GetAdminUsersByBranchId(branchId));
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByUserId(long id)
        {
            return Ok(await _userService.GetById(id));
        }

        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody]UpdateModel model)
        {
            return Ok(await _userService.Update(id, model));
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting, User")]
        [HttpPut]
        public async Task<IActionResult> UpdateMobileUser([FromBody]UpdateModel model)
        {
            return Ok(await _userService.UpdateMobileUser(model));
        }

        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            return Ok(await _userService.DeleteAsync(id));
        }


        [Authorize(Roles = "Super Admin, Admin, Employee")]
        [HttpPost()]
        public async Task<object> CreateUser([FromBody] RegisterModel model)
        {
           return await _userService.Register(model);
        }


        [AllowAnonymous]
        [HttpPost("recoverpassword")]
        public async Task<IActionResult> RecoverPassword([FromBody]ResetPasswordDTO model)
        {
            await _userService.RecoverPassword(model.Email);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ResetPasswordDTO model)
        {
            var response = await _userService.ChangePassword(model.Email, model.Password, model.Token);
            return Ok(response);
        }

    }
}