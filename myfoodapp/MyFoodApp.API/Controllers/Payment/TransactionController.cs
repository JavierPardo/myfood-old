using System;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;
using MyFoodApp.API.Infrastructure.Extension;
using Microsoft.AspNetCore.Authorization;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController: ControllerBase
    {
        private readonly ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet]
        public IEnumerable<ClientTransaction> GetTransactions()
        {
            return _transactionService.GetAll();
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public IEnumerable<ClientTransaction> GetTransactionsByBranchId(int branchId)
        {
            return _transactionService.GetTransactionsByBranchId(branchId);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}/{startrange}/{endrange}")]
        public IEnumerable<ClientTransaction> GetTransactionsByBranchIdAndDate(long id, string startrange, string endrange)
        {
            return _transactionService.GetTransactionsByBranchIdAndDate(id, startrange, endrange);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public ClientTransaction GetByTransactionId(long id)
        {
            return _transactionService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddTransaction([FromBody] ClientTransaction transaction)
        {
            _transactionService.Add(transaction);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateTransaction(long id, [FromBody] ClientTransaction transaction)
        {
            _transactionService.Update(transaction);
        }

        [Authorize(Roles = "Super Admin, Employee, Admin, Accounting")]
        [HttpGet("Event/{eventId}")]
        public ClientTransaction GetClientTransactionsByEventId(long eventId)
        {
            return _transactionService.GetByEventId(eventId);
        }

        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    _transactionService.Delete(id);
        //}
    }
}
