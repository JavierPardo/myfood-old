using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController: ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet]
        public IEnumerable<Invoice> GetInvoices()
        {
            return _invoiceService.GetAll();
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("getbybranchid/{branchId}")]
        public IEnumerable<Invoice> GetInvoicesByBranchId(int branchId)
        {
            return _invoiceService.GetInvoicesByBranchId(branchId);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public Invoice GetByInvoiceId(long id)
        {
            return _invoiceService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddInvoice([FromBody] Invoice invoice)
        {
            _invoiceService.Add(invoice);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateInvoice(long id, [FromBody] Invoice invoice)
        {
            _invoiceService.Update(invoice);
        }

        //[HttpDelete("{id}")]
        //public void DeleteInvoice(int id)
        //{
        //    _invoiceService.Delete(id);
        //}
    }
}