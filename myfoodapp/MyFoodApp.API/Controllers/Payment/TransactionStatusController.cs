using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Controllers.Payment
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionStatusController : ControllerBase
    {
        private readonly ITransactionStatusService _transactionStatusService;
        public TransactionStatusController(ITransactionStatusService transactionStatusService)
        {
            _transactionStatusService = transactionStatusService;
        }

        [Authorize(Roles = "Super Admin, Admin, Accounting, Employee")]
        [HttpGet]
        public IEnumerable<TransactionStatus> GetTransactionStatuses()
        {
            return _transactionStatusService.GetAll();
        }

        [Authorize(Roles = "Super Admin, Admin, Accounting, Employee")]
        [HttpGet("{id}")]
        public TransactionStatus GetByTransactionStatusId(int id)
        {
            return _transactionStatusService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddTransactionStatus([FromBody] TransactionStatus transactionStatus)
        {
            _transactionStatusService.Add(transactionStatus);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateTransactionStatus([FromBody] TransactionStatus transactionStatus)
        {
            _transactionStatusService.Update(transactionStatus);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteTransactionStatus(int id)
        {
            _transactionStatusService.Delete(id);
        }
    }
}