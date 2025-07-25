using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypeController: ControllerBase
    {
        private readonly IPaymentTypeService _paymentTypeService;
        public PaymentTypeController(IPaymentTypeService paymentTypeService)
        {
            _paymentTypeService = paymentTypeService;
        }

        [Authorize(Roles = "Super Admin, User")]
        [HttpGet]
        public IEnumerable<PaymentType> GetPaymentTypes()
        {
            return _paymentTypeService.GetAll();
        }

        [Authorize(Roles = "Super Admin, User")]
        [HttpGet("getbybranchid/{branchId}")]
        public IEnumerable<PaymentType> GetPaymentTypesByBranchId(int branchId)
        {
            return _paymentTypeService.GetPaymentTypesByBranchId(branchId);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public PaymentType GetByPaymentTypeId(int id)
        {
            return _paymentTypeService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddPaymentType([FromBody] PaymentType paymentProvider)
        {
            _paymentTypeService.Add(paymentProvider);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdatePaymentType([FromBody] PaymentType paymentProvider)
        {
            _paymentTypeService.Update(paymentProvider);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeletePaymentType(int id)
        {
            _paymentTypeService.Delete(id);
        }
    }
}
