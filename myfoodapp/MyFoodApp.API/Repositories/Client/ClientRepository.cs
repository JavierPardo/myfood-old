using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class ClientRepository : EntityModelRepository<Client, int>, IClientRepository
    {
        public ClientRepository(DataContext context, ILogger<Client> logger) : base(context, logger)
        {
        }
    }
}
