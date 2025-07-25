using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Exception;
using MyFoodApp.API.Infrastructure.Extension;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogisticProviderController : ControllerBase
    {
        private readonly ILogisticProviderService _logisticProviderService;
        public LogisticProviderController(ILogisticProviderService logisticProviderService)
        {
            _logisticProviderService = logisticProviderService;
        }

        // GET: api/<LogisticProviderController>
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet]
        public IEnumerable<LogisticProvider> GetLogisticProviders()
        {
            return _logisticProviderService.GetAllByClient();
        }

        // GET: api/<LogisticProviderController>
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("ByBranch")]
        public IEnumerable<LogisticProvider> GetLogisticProvidersByBranch()
        {
            return _logisticProviderService.GetAllByBranch();
        }

        // GET api/<LogisticProviderController>/5
        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("{id}")]
        public LogisticProvider GetByLogisticProviderId(int id)
        {
            return _logisticProviderService.Get(id);
        }

        // POST api/<LogisticProviderController>
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPost]
        public void AddLogisticProvider([FromBody] LogisticProvider logisticProvider)
        {
            _logisticProviderService.Add(logisticProvider);
        }

        // PUT api/<LogisticProviderController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPut("{id}")]
        public void UpdateLogisticProvider([FromBody] LogisticProvider logisticProvider)
        {
            _logisticProviderService.Update(logisticProvider);
        }

        // DELETE api/<LogisticProviderController>/5
        [Authorize(Roles = "Super Admin, Admin")]
        [HttpDelete("{id}")]
        public void DeleteLogisticProvider(int id)
        {
            _logisticProviderService.Delete(id);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("toggleActive")]
        public void updateIsActiveProvider([FromBody] LogisticProvider logisticProvider)
        {
            _logisticProviderService.UpdateActiveFlag(logisticProvider);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("toggleDefault")]
        public void updateIsDefaultProvider([FromBody] BranchLogisticProvider logisticProvider)
        {
            _logisticProviderService.UpdateDefaultFlag(logisticProvider);
        }
    }
}
