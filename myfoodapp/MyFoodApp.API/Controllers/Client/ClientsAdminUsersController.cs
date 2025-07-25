using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsAdminUsersController : ControllerBase
    {
        private readonly IClientsAdminUsersService _clientsAdminUsersService;

        public ClientsAdminUsersController(IClientsAdminUsersService clientsAdminUsersService)
        {
            _clientsAdminUsersService = clientsAdminUsersService;
        }

        [HttpGet]
        public IEnumerable<ClientsAdminUsers> GetClientAdmins()
        {
            return _clientsAdminUsersService.GetAll();
        }

        [HttpGet("{id}")]
        public ClientsAdminUsers Get(int id)
        {
            return _clientsAdminUsersService.Get(id);
        }

        [HttpPost]
        public void Post([FromBody] ClientsAdminUsers userNotification)
        {
            _clientsAdminUsersService.Add(userNotification);
        }


        [HttpPut("{id}")]
        public void Put([FromBody] ClientsAdminUsers userNotification)
        {
            _clientsAdminUsersService.Update(userNotification);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _clientsAdminUsersService.Delete(id);
        }
    }
}
