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
    public class LogisticProviderRateTypeController : ControllerBase
    {
        private readonly ILogisticProviderRateTypeService _LogisticProviderRateTypeService;
        public LogisticProviderRateTypeController(ILogisticProviderRateTypeService logisticProviderRateService)
        {
            _LogisticProviderRateTypeService = logisticProviderRateService;
        }

        // GET: api/<LogisticProviderRateTypeController>
        [HttpGet]
        public IEnumerable<LogisticProviderRateType> GetLogisticProviderRateTypees()
        {            
            return _LogisticProviderRateTypeService.GetAll();
        }

        // GET api/<LogisticProviderRateTypeController>/5
        [HttpGet("{id}")]
        public LogisticProviderRateType GetByLogisticProviderRateTypeId(int id)
        {
            return _LogisticProviderRateTypeService.Get(id);
        }

        // POST api/<LogisticProviderRateTypeController>
        [HttpPost]
        public void AddLogisticProviderRateType([FromBody] LogisticProviderRateType logisticProviderRate)
        {
            _LogisticProviderRateTypeService.Add(logisticProviderRate);
        }

        // PUT api/<LogisticProviderRateTypeController>/5
        [HttpPut("{id}")]
        public void UpdateLogisticProviderRateType([FromBody] LogisticProviderRateType logisticProviderRate)
        {
            _LogisticProviderRateTypeService.Update(logisticProviderRate);
        }

        // DELETE api/<LogisticProviderRateTypeController>/5
        [HttpDelete("{id}")]
        public void DeleteLogisticProviderRateType(int id)
        {
            _LogisticProviderRateTypeService.Delete(id);
        }
    }
}
