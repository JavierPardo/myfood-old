using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Models;
using MyFoodApp.API.Services;

namespace MyFoodApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SocialAccountController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly SignInManager<User> _signInManager;
        private readonly ISocialLoginService _socialLoginService;

        public SocialAccountController(SignInManager<User> signInManager, 
            IUserService userService,
            IMapper mapper,
            ISocialLoginService socialLoginService)
        {
            _mapper = mapper;
            _userService = userService;
            _signInManager = signInManager;
            _socialLoginService = socialLoginService;
        }

        [HttpPost]
        [Route("facebook-login")]
        public IActionResult FacebookLogin([FromBody] ExternalLoginDto externalLogin)
        {
            var emailUser = _socialLoginService.GetEmailByFacebookToken(externalLogin.Token);
            if (string.IsNullOrEmpty(emailUser) || externalLogin.Email.ToLower() != emailUser.ToLower())
            {
                throw new AuthenticationException();
            }
            var userApp = _userService.GetByEmail(emailUser);
            if (userApp == null)
            {
                _userService.CreateUserSync(_mapper.Map<RegisterModel>(externalLogin));
                userApp = _userService.GetByEmail(emailUser);
            }
            return Ok(_userService.GenerateJwtToken(null, _mapper.Map<User>(userApp)).Result);
        }

        [HttpPost]
        [Route("google-login")]
        public IActionResult GoogleLogin([FromBody] ExternalLoginDto externalLogin)
        {
            var emailUser = _socialLoginService.GetEmailByGmailToken(externalLogin.Token);
            if (string.IsNullOrEmpty(emailUser) || externalLogin.Email.ToLower() != emailUser.ToLower())
            {
                throw new AuthenticationException();
            }
            var userApp = _userService.GetByEmail(emailUser);
            if (userApp == null)
            {
                _userService.CreateUserSync(_mapper.Map<RegisterModel>(externalLogin));
                userApp = _userService.GetByEmail(emailUser);
            }
            return Ok(_userService.GenerateJwtToken(null, _mapper.Map<User>(userApp)).Result);
        }

        [Route("/[action]")]
        [HttpPost]
        public async Task<IActionResult> ExternalLoginCallback()
        {
            var request = HttpContext.Request;
            //Here we can retrieve the claims
            // read external identity from the temporary cookie
            //var authenticateResult = HttpContext.GetOwinContext().Authentication.AuthenticateAsync("ExternalCookie");
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (result.Succeeded != true)
            {
                throw new Exception("External authentication error");
            }

            // retrieve claims of the external user
            var externalUser = result.Principal;
            if (externalUser == null)
            {
                throw new Exception("External authentication error");
            }

            // retrieve claims of the external user
            var claims = externalUser.Claims.ToList();

            // try to determine the unique id of the external user - the most common claim type for that are the sub claim and the NameIdentifier
            // depending on the external provider, some other claim type might be used
            //var userIdClaim = claims.FirstOrDefault(x => x.Type == JwtClaimTypes.Subject);
            var userIdClaim = claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new Exception("Unknown userid");
            }

            var externalUserId = userIdClaim.Value;
            var externalProvider = userIdClaim.Issuer;

            // use externalProvider and externalUserId to find your user, or provision a new user

            return RedirectToAction("Privacy", "Home");
        }
    }
}
