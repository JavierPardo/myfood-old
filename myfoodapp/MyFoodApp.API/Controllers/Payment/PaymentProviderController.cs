using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentProviderController: ControllerBase
    {
        private readonly IPaymentProviderService _paymentProviderService;
        public PaymentProviderController(IPaymentProviderService paymentProviderService)
        {
            _paymentProviderService = paymentProviderService;
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet]
        public IEnumerable<PaymentProvider> GetPaymetProviders()
        {
            return _paymentProviderService.GetAll();
        }

        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public PaymentProvider GetByPaymentProviderId(int id)
        {
            return _paymentProviderService.Get(id);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddPaymentProvider([FromBody] PaymentProvider paymentProvider)
        {
            _paymentProviderService.Add(paymentProvider);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdatePaymentProvider([FromBody] PaymentProvider paymentProvider)
        {
            _paymentProviderService.Update(paymentProvider);
        }

        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeletePaymentProvider(int id)
        {
            _paymentProviderService.Delete(id);
        }
    }
}
