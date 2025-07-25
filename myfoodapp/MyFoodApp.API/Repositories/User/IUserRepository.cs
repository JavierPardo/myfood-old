using MyFoodApp.API.Entities;
using MyFoodApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserRepository : IEntityModelRepository<User, long>
    {
        User GetClientById(long userId);
        IEnumerable<User> GetAdminUsersByBranchId(int branchId);
        IEnumerable<User> GetAllUsersByClientId(int clientId);        
        IEnumerable<User> GetWithEvents();
        IEnumerable<User> GetAllByOrderId(long id);
        User GetByEmail(string emailUser);
    }
}
