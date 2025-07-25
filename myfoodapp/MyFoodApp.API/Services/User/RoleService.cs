using Microsoft.AspNetCore.Identity;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Services
{
    public class RoleService: IRoleService
    {
        private readonly RoleManager<IdentityRole<long>> _roleManager;
        private readonly IUserSession _userSession;
        public RoleService(RoleManager<IdentityRole<long>> roleManager, IUserSession userSession)
        {
            _roleManager = roleManager;
            _userSession = userSession;
        }
        public List<IdentityRole<long>> GetAll() 
        {
            var hasAdminRole = _userSession.HasAdminRol;
            var hasSuperAdminRole = _userSession.HasSuperAdminRol;
            List<IdentityRole<long>> roles;            

            switch (_userSession.UserRol)
            {
                case "Super Admin":
                    roles = _roleManager.Roles.Where(x => x.Name != "User").ToList();
                    break;
                case "Admin":
                case "Employee":
                    roles = _roleManager.Roles.Where(x => x.Name != "User" && x.Name != "Super Admin" && x.Name != "Admin").ToList();
                    break;
                default:
                    roles = null;
                    break;
            }
            return roles;

        }
    }
}
