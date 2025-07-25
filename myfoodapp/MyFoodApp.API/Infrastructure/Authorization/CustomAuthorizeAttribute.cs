using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using MyFoodApp.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Authorization
{
    //public class CustomAuthorizeAttribute : AuthorizeAttribute
    //{

    //    private readonly IUserRoleService _userRoleService;
    //    private string[] _allowedRoles;

    //    public CustomAuthorizeAttribute(params string[] roles)
    //    {
    //        _userRoleService = new UserSession();
    //        _allowedRoles = roles;
    //    }
    //    protected override bool AuthorizeCore(HttpContextAccessor httpContext)
    //    {
    //        //something like this.
    //        var userName = httpContext.User.Identity.Name;
    //        var userRoles = _userRoleService.GetUserRoles(userName); // return list of strings
    //        return _allowedRoles.Any(x => userRoles.Contains(x));
    //    }
    //}
}
