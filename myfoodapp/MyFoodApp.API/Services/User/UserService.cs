using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Models;
using MyFoodApp.Resources;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Infrastructure.Exception;
using Microsoft.AspNetCore.WebUtilities;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace MyFoodApp.API.Services
{
    public class UserService : IUserService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole<long>> _roleManager;
        private readonly IUserSession _userSession;

        public ILogger<UserService> _logger { get; }

        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly SmtpSettings _smtpSettings;
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IUserRepository _userRepository;
        private readonly IClientsAdminUsersService _clientsAdminUsersService;
        public UserService(UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper,
            RoleManager<IdentityRole<long>> roleManager,
            IUserSession userSession,
            IOptions<AppSettings> appSettings,
            IOptions<SmtpSettings> smtpSettings,
            IStringLocalizer<SharedResource> sharedLocalizer,
            IPasswordHasher<User> passwordHasher,
            IUserRepository userRepository,
            IClientsAdminUsersService clientsAdminUsersService,
            ILogger<UserService> logger)
        {
            _configuration = configuration;
             _roleManager = roleManager;
            _userSession = userSession;
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _smtpSettings = smtpSettings.Value;
            _sharedLocalizer = sharedLocalizer;
            _passwordHasher = passwordHasher;
            _userRepository = userRepository;
            _clientsAdminUsersService = clientsAdminUsersService;
        }
        public async Task<object> Authenticate(string username, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(username, password, false, false);

            if (result.Succeeded)
            {               
                var appUser = _userManager.Users.SingleOrDefault(r => r.Email == username);
                appUser.LastUserLogin = DateTime.Now;
                return await GenerateJwtToken(username, appUser);
            }

            throw new ApiException(HttpStatusCode.Unauthorized, "Authentication failed");
        }

        public async Task<object> GenerateJwtToken(string email, User user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email??user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),                
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_appSettings.JwtExpireDays));

            var token = new JwtSecurityToken(
                _appSettings.JwtIssuer,
                _appSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IEnumerable<AppUserModel>> GetAllAsync()
        {
            IList<User> users = null;
            switch (_userSession.UserRol)
            {
                case "Super Admin":
                    users = _userManager.Users.Where(x => x.ClientsAdminUsers.Any(t => t.ClientId == _userSession.ClientId) || x.ClientsAdminUsers.Count == 0).ToList();
                break;
                case "Admin":
                case "Employee":
                case "Accounting":
                    users = await _userManager.GetUsersInRoleAsync("Accounting");
                    users = users.Concat(await _userManager.GetUsersInRoleAsync("Employee")).ToList();
                    users = _userRepository.GetAllUsersByClientId(_userSession.ClientId).Where(x=>users.Any(t=>t.Id==x.Id)).ToList();                    
                break;                                                        
            }
                       
            var model = _mapper.Map<IList<AppUserModel>>(users);
            return model;
        }
        
        public async Task<RegisterModel> GetById(long id)
        {            
            var user = _userRepository.GetByKey(id);          
            
            var model = _mapper.Map<RegisterModel>(user);
            model.Password = "";
            var userRoles = await _userManager.GetRolesAsync(user);
            model.Role = userRoles.FirstOrDefault();
            model.CanDelete = false;// userRoles.FirstOrDefault() != "Super Admin";
            model.CanEdit = _userSession.HasSuperAdminRol || (_userSession.HasAdminRol&&!_userSession.HasUserRol);
            return model;
        }

        public async Task<object> RegisterUser(RegisterModel model)
        {
            var user = _mapper.Map<User>(model);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                user.RegistrationDate = DateTime.Now;
                _userManager.AddToRoleAsync(user, "User").Wait();
                await _signInManager.SignInAsync(user, false);
                return await GenerateJwtToken(model.Email, user);
            }
            throw new ApiException(HttpStatusCode.BadRequest, result.Errors.FirstOrDefault().Description);
        }

        public async Task<object> Register(RegisterModel model)
        {
            var user = _mapper.Map<User>(model);
            
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                user.RegistrationDate = DateTime.Now;
                _userManager.AddToRoleAsync(user, model.Role).Wait();
                if (model.Role != "Super Admin" || model.Role != "User")
                {
                    ClientsAdminUsers clientsAdminUsers = new ClientsAdminUsers();
                    clientsAdminUsers.ClientId = _userSession.ClientId;
                    clientsAdminUsers.UserId = user.Id;
                    _clientsAdminUsersService.Add(clientsAdminUsers);
                }
                
                return await GenerateJwtToken(model.Email, user);
            }
           throw new ApiException(HttpStatusCode.BadRequest, result.Errors.FirstOrDefault().Description);
        }


        public async Task<Boolean> DeleteAsync(long id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
                return result.Succeeded;                
            }
            throw new ApplicationException("UNKNOWN_ERROR");
            
        }

        public async Task<bool> Update(long id,UpdateModel model)
        {
            // map model to entity and set id            
            var user = await _userManager.FindByIdAsync(id.ToString());            
            
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            
            if (!string.IsNullOrEmpty(model.Password))
            {
                user.PasswordHash= _passwordHasher.HashPassword(user, model.Password);
            }
            
            if (model.Preferences!=null)
                user.Preferences = model.Preferences.Split(',').ToList();
                        
            // update user 
            IdentityResult result = await _userManager.UpdateAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            foreach (string role in roles)
            {
                await _userManager.RemoveFromRoleAsync(user, role);
            }
            _userManager.AddToRoleAsync(user, model.Role).Wait();

            var userWithClientId = _userRepository.GetClientById(id);
            //update clientAdminUsers if user doesnt have the relation
            if (userWithClientId.ClientsAdminUsers.Count == 0 && (model.Role != "Super Admin" || model.Role != "User"))
            {
                ClientsAdminUsers clientsAdminUsers = new ClientsAdminUsers();
                clientsAdminUsers.ClientId = _userSession.ClientId;
                clientsAdminUsers.UserId = user.Id;
                _clientsAdminUsersService.Add(clientsAdminUsers);
            }           
            return result.Succeeded;
        }
        
        public async Task<bool> UpdateMobileUser(UpdateModel model)
        {
            var userId = _userSession.GetUserId();
            // map model to entity and set id            
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (!string.IsNullOrEmpty(model.FirstName))
                user.FirstName = model.FirstName;

            if (!string.IsNullOrEmpty(model.LastName))
                user.LastName = model.LastName;

            if (!string.IsNullOrEmpty(model.Email))
                user.Email = model.Email;

            if (!string.IsNullOrEmpty(model.PhoneNumber))
                user.PhoneNumber = model.PhoneNumber;

            if (!string.IsNullOrEmpty(model.Password))
                user.PasswordHash = _passwordHasher.HashPassword(user, model.Password);

            if (!string.IsNullOrEmpty(model.Preferences))
                user.Preferences = model.Preferences.Split(',').ToList();
            // update user 
            IdentityResult result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<WebUserDto> GetCurrentUser()
        {
            var userId = _userSession.GetUserId();
            var user = _userRepository.GetByKey(userId);
            if (user == null)
            {
                return null;
            }
            var userDto = _mapper.Map<WebUserDto>(user);
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

            userDto.RolesText = rolesList.ToArray();
            return userDto;
        }

        public IEnumerable<AppUserModel> GetAdminUsersByBranchId(int branchId)
        {
            var users =_userRepository.GetAdminUsersByBranchId(branchId);                       
            return _mapper.Map<IList<AppUserModel>>(users);
        }

        public IEnumerable<User> GetWithEvents()
        {
            return _userRepository.GetWithEvents();
        }

        public IEnumerable<User> GetAllByOrderId(long id)
        {
            return _userRepository.GetAllByOrderId(id);
        }
      
        public void CreateUserSync(RegisterModel model)
        {
            if (string.IsNullOrEmpty(model.Password))
            {
                model.Password = "Control123!@";
                model.Role = "User";
            }
            var user = _mapper.Map<User>(model);

            var result = _userManager.CreateAsync(user, model.Password).Result;

            if (result.Succeeded)
            {
                user.RegistrationDate = DateTime.Now;
                _userManager.AddToRoleAsync(user, model.Role).Wait();
                return;
            }
            throw new ApiException(HttpStatusCode.BadRequest, result.Errors.Select(e => e.Code).ToString());
        }

        public async Task RecoverPassword(string userEmail) 
        {
            var user =  await _userManager.FindByEmailAsync(userEmail);
            var token =  await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));            
            var param = new Dictionary<string, string>() { { "token", token },{"email",userEmail } };
            var resetPasswordUrl = $"{_configuration["Server:FrontEndAdmin"]}/resetPassword";
            var recoverPasswordUrl = new Uri(QueryHelpers.AddQueryString(resetPasswordUrl, param));
            SendRecoverPasswordMail(userEmail, recoverPasswordUrl.ToString());            
        }

        public async Task<object> ChangePassword(string userEmail, string password, string token)
        {
            var originalToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
            var user = await _userManager.FindByEmailAsync(userEmail);
           return await _userManager.ResetPasswordAsync(user, originalToken, password);            
        }

        private void SendRecoverPasswordMail(string toMail, string recoverUrl) {
            var smptMailInfo = new MailMessage();
            smptMailInfo.From = new MailAddress(_smtpSettings.RecoveryPasswordAccount);
            smptMailInfo.To.Add(toMail);
            smptMailInfo.Subject = _sharedLocalizer.GetString("RecoverPasswordEmailSubject");
            smptMailInfo.IsBodyHtml = true;
            smptMailInfo.Body = String.Format(_sharedLocalizer.GetString("RecoverPasswodEmailBody"), recoverUrl);

            try
            {
               
                using (var client = new SmtpClient())
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new System.Net.NetworkCredential(_smtpSettings.User, _smtpSettings.Password);
                    client.Port = _smtpSettings.Port; // You can use Port 25 if 587 is blocked
                    client.Host = _smtpSettings.Host;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.EnableSsl = true;
                    client.Send(smptMailInfo);
                }
            }
            catch (Exception e)
            {
                throw e;                
            }
        }

        public AppUserModel GetMobileUserProfile()
        {
            var userId = _userSession.GetUserId();
            var user = _userRepository.GetByKey(userId);
            if (user == null)
            {
                return null;
            }
            var userDto = _mapper.Map<AppUserModel>(user);
            
            return userDto;
        }

        public AppUserModel GetByEmail(string emailUser)
        {
            return _mapper.Map<AppUserModel>( _userRepository.GetByEmail(emailUser));
        }
    }
}
