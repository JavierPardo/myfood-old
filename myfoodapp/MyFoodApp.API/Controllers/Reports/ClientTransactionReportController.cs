using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientTransactionReportController : Controller
    {
        private readonly IClientTransactionReportService _modelService;
        private readonly IMapper _mapper;

        public ClientTransactionReportController(IClientTransactionReportService modelService,
            IMapper mapper)
        {
            _mapper = mapper;
            _modelService = modelService;
        }

        // GET: api/<ClientTransactionReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getclienttransactionsbydate/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetClientTransactionsByDate(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                var clientTransactions = _modelService.GetClientTransactionsByDate(from, to, true);
                return Ok(_mapper.Map<ClientTransactionsByDateReportDto>(clientTransactions));
            }
            return BadRequest();
        }
        // GET: api/<ClientTransactionReportController>/20201101/20201103
        [Authorize(Roles = "Super Admin, Admin, Employee, Accounting")]
        [HttpGet("getlogisticreconciliationbydate/{fromDate}/{toDate}/{withConciliation}")]  //Dates in yyyyMMdd format
        public IActionResult GetLogisticReconciliationByDate(string fromDate, string toDate, bool withConciliation)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                var clientTransactions = _modelService.GetClientTransactionsByDate(from, to, withConciliation);
                return Ok(_mapper.Map<LogisticReconciliationsByDateReportDto>(clientTransactions));
            }
            return BadRequest();
        }

        // GET: api/<GetCommissionReconciliationByDateClientOrBranch>/20201101/20201103
        [Authorize(Roles = "Super Admin")]
        [HttpGet("getcommissionreconciliationbydateclientorbranch/{fromDate}/{toDate}")]  //Dates in yyyyMMdd format
        public IActionResult GetCommissionReconciliationByDateClientOrBranch(string fromDate, string toDate)
        {
            DateTime from = DateTime.ParseExact($"{fromDate}", "yyyyMMdd", null);
            DateTime to = DateTime.ParseExact($"{toDate}", "yyyyMMdd", null);
            to = to.Date.AddDays(1).AddSeconds(-1);

            if (from.CompareTo(to) < 0)
            {
                var clientTransactions = _modelService.GetClientTransactionsByDateClientOrBranch(from, to);
                return Ok(_mapper.Map<CommissionsReconciliationByDateReportDto>(clientTransactions));
            }
            return BadRequest();
        }
    }
}
