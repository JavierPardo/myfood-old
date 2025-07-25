using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionStatusHistoryController : ControllerBase
    {
        private readonly ITransactionStatusHistoryService _transactionStatusHistoryService;

        public TransactionStatusHistoryController(ITransactionStatusHistoryService transactionStatusHistoryService)
        {
            _transactionStatusHistoryService = transactionStatusHistoryService;

        }

        // GET api/<TransactionStatusHistoryController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public TransactionStatusHistory GetStatusHistoryByTransactionId(long id)
        {
            return _transactionStatusHistoryService.GetStatusHistoryByTransactionId(id);
        }

        // POST api/<TransactionStatusHistoryController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddTransactionStatusHistory([FromBody] TransactionStatusHistory transactionStatusHistory)
        {
            _transactionStatusHistoryService.Add(transactionStatusHistory);
        }

    }
}
