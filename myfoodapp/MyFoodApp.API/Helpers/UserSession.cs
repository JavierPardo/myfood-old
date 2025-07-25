using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Infrastructure.Extension;

namespace MyFoodApp.API.Helpers
{
    public class UserSession : IUserSession
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ILogger<UserSession> _logger;
        private int _branchId;
        private int _clientId;
        private const string SUPERADMIN_ROLE = "Super Admin";
        private const string EMPLOYEE_ROLE = "Employee";
        private const string ACCOUNTING_ROLE = "Accounting";
        private const string ADMIN_ROLE = "Admin";
        private const string USER_ROLE = "User";

        public UserSession(IHttpContextAccessor contextAccesssor, ILogger<UserSession> logger)
        {
            _contextAccessor = contextAccesssor;
            _logger = logger;
        }

        public int BranchId
        {
            get
            {
                if (_branchId == 0)
                {
                    string branchIdCrypted = _contextAccessor.HttpContext.Request.Headers["branchId"].FirstOrDefault() ?? string.Empty;
                    _branchId = branchIdCrypted.DecodeFromBase32String<int>();
                }
                return _branchId;
            }
        }
        public long UserId
        {
            get
            {
                var userId = GetUserId();
                return userId;
            }
        }

        public string Url { get
            {
                return $"{_contextAccessor.HttpContext.Request.Scheme}://{_contextAccessor.HttpContext.Request.Host}";
            }
        }
        public bool HasUserRol
        {
            get
            {
                return CheckUserRole(USER_ROLE);
            }

        }

        public bool HasSuperAdminRol
        {
            get
            {
                return CheckUserRole(SUPERADMIN_ROLE);
            }
        }

        public bool HasAdminRol
        {
            get
            {
                return CheckUserRole(ADMIN_ROLE);
            }
        }

        public string UserRol
        {
            get
            {
                string userRoles = string.Empty;
                if (_contextAccessor.HttpContext != null)
                {
                    ClaimsIdentity identity = _contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                    if (identity != null && identity.Claims.Any())
                    {
                        IEnumerable<Claim> claims = identity.Claims;
                        userRoles = claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value;
                    }
                }
                return userRoles;
            }

        }

        public int ClientId
        {
            get
            {
                if (_clientId == 0)
                {
                    string clientIdCrypted = _contextAccessor.HttpContext.Request.Headers["clientId"].FirstOrDefault() ?? string.Empty;
                    _clientId = clientIdCrypted.DecodeFromBase32String<int>();
                }
                return _clientId;
            }
        }        

        public long GetUserId()
        {
            var userId = 0;
            ClaimsIdentity identity = _contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null && identity.Claims.Any())
            {
                IEnumerable<Claim> claims = identity.Claims;
                if (claims != null && claims.Count() > 0)
                    userId = int.Parse(claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier.ToString()).Value);
            }
            return userId;
        }

        private bool CheckUserRole(string roleName)
        {
                bool hasRole = false;
            if (_contextAccessor.HttpContext != null)
            {
                ClaimsIdentity identity = _contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null && identity.Claims.Any())
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    hasRole = claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value == roleName;
                }
            }
            return hasRole;
        }
        
        public bool IsSuperAdmin()
        {
            bool isAdmin = false;
            if (_contextAccessor.HttpContext != null)
            {
                ClaimsIdentity identity = _contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    isAdmin = bool.Parse(claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value);
                }
            }
            return isAdmin;

        }

    }
}
