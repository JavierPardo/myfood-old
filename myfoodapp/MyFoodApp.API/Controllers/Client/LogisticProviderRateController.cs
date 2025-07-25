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
    public class LogisticProviderRateController : ControllerBase
    {
        private readonly ILogisticProviderRateService _logisticProviderRateService;
        public LogisticProviderRateController(ILogisticProviderRateService logisticProviderRateService)
        {
            _logisticProviderRateService = logisticProviderRateService;
        }

        // GET: api/<LogisticProviderRateController>
        [HttpGet]
        public IEnumerable<LogisticProviderRate> GetLogisticProviderRates()
        {
            return _logisticProviderRateService.GetAll();
        }

        [HttpGet("ByBranch")]
        public IEnumerable<LogisticProviderRate> GetLogisticProviderRatesByBranch()
        {
            return _logisticProviderRateService.GetAllByBranch();
        }

        // GET api/<LogisticProviderRateController>/5
        [HttpGet("{id}")]
        public LogisticProviderRate GetByLogisticProviderRateId(int id)
        {
            return _logisticProviderRateService.Get(id);
        }

        // POST api/<LogisticProviderRateController>
        [HttpPost]
        public void AddLogisticProviderRate([FromBody] LogisticProviderRate logisticProviderRate)
        {
            _logisticProviderRateService.Add(logisticProviderRate);
        }

        // PUT api/<LogisticProviderRateController>/5
        [HttpPut("{id}")]
        public void UpdateLogisticProviderRate([FromBody] LogisticProviderRate logisticProviderRate)
        {
            _logisticProviderRateService.Update(logisticProviderRate);
        }

        [Authorize(Roles = "Super Admin, Admin")]
        [HttpPatch("toggleActive")]
        public void updateIsActiveProvider([FromBody] LogisticProviderRate logisticProviderRate)
        {
            _logisticProviderRateService.UpdateActiveFlag(logisticProviderRate);
        }

        // DELETE api/<LogisticProviderRateController>/5
        [HttpDelete("{id}")]
        public void DeleteLogisticProviderRate(int id)
        {
            _logisticProviderRateService.Delete(id);
        }
    }
}
