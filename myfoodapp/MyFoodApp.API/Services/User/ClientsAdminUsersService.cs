using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class ClientsAdminUsersService : IClientsAdminUsersService
    {
        private readonly IClientsAdminUsersRepository _clientsAdminUsersRepository;

        public ClientsAdminUsersService(IClientsAdminUsersRepository clientsAdminUsersRepository)
        {
            _clientsAdminUsersRepository = clientsAdminUsersRepository;
        }
        public void Add(ClientsAdminUsers clientsAdminUsers) => _clientsAdminUsersRepository.Create(clientsAdminUsers);

        public void Delete(int id) => _clientsAdminUsersRepository.DeleteByKey(id);

        public ClientsAdminUsers Get(int id) => _clientsAdminUsersRepository.GetByKey(id);

        public ICollection<ClientsAdminUsers> GetAll() => _clientsAdminUsersRepository.GetAll();        

        public void Update(ClientsAdminUsers clientsAdminUsers) => _clientsAdminUsersRepository.Update(clientsAdminUsers);
    }
}
