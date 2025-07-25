using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Exception;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Services;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMapper _mapper;

        public ClientController(IClientService clientService, IMapper mapper)
        {
            _mapper = mapper;
            _clientService = clientService;
        }

        // GET: api/<ClientController>
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet]
        public IEnumerable<Entities.Client> GetClients()
        {           
            return _clientService.GetAll();
        }

        // GET api/<ClientController>/5
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("{cryptClientId}")]
        public IActionResult GetByClientId(string cryptClientId)
        {
            int id = cryptClientId.DecodeFromBase32String<int>();
            var model = _clientService.Get(id);
            if (model == null)
            {
                throw new ApiException(HttpStatusCode.NotFound);
            }
            return Ok(model);
        }


        // POST api/<ClientController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public ActionResult AddClient([FromBody] Entities.Client client)
        {            
            _clientService.Add(client);
            return Ok();
        }

        // PUT api/<ClientController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut]
        public void UpdateClient([FromBody] Entities.Client client)
        {
            _clientService.Update(client);
        }

        // PUT api/<ClientController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPatch("UpdateIsActive")]
        public void UpdateIsActiveClient([FromBody] Entities.Client client)
        {
            _clientService.UpdateIsActive(client);
        }

        // DELETE api/<ClientController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete]
        public void DeleteClient([FromBody]Entities.Client client)
        {
            _clientService.Delete(client.Id);
        }
    }
}
