using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserService
    {
        Task<object> Authenticate(string username, string password);
        Task<IEnumerable<AppUserModel>> GetAllAsync();
        Task<RegisterModel> GetById(long id);
        Task<object> Register(RegisterModel model);
        Task<object> RegisterUser(RegisterModel model);        
        Task<Boolean> DeleteAsync(long id);
        Task<Boolean> Update(long id,UpdateModel model);        
        Task<WebUserDto> GetCurrentUser();
        IEnumerable<AppUserModel> GetAdminUsersByBranchId(int branchId);
        IEnumerable<User> GetWithEvents();
        IEnumerable<User> GetAllByOrderId(long id);
        Task<bool> UpdateMobileUser(UpdateModel model);
        Task<object> ChangePassword(string userEmail, string password, string token);
        Task RecoverPassword(string email);
        AppUserModel GetMobileUserProfile();
        AppUserModel GetByEmail(string emailUser);
        void CreateUserSync(RegisterModel registerModel);
        Task<object> GenerateJwtToken(string email, User user);
    }
}
