using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class ClientsAdminUsersRepository : EntityModelRepository<ClientsAdminUsers,int>,IClientsAdminUsersRepository
    {
        public ClientsAdminUsersRepository(DataContext dataContext, ILogger<ClientsAdminUsers> logger):base(dataContext, logger)
        {

        }
    }
}
