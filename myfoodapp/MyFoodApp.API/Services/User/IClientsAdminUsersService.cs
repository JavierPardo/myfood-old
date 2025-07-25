using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IClientsAdminUsersService
    {
        void Add(ClientsAdminUsers clientsAdminUser);
        void Update(ClientsAdminUsers clientsAdminUser);
        ClientsAdminUsers Get(int id);
        ICollection<ClientsAdminUsers> GetAll();
        void Delete(int id);
    }
}
