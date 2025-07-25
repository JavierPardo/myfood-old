using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class PaymentProviderService : IPaymentProviderService
    {
        private readonly IPaymentProviderRepository _paymentProviderRepository;
        public PaymentProviderService(IPaymentProviderRepository paymentProviderRepository)
        {
            _paymentProviderRepository = paymentProviderRepository;
        }

        public void Add(PaymentProvider paymentProvider) => _paymentProviderRepository.Create(paymentProvider);

        public void Delete(int id) => _paymentProviderRepository.DeleteByKey(id);

        public PaymentProvider Get(int id) => _paymentProviderRepository.GetByKey(id);

        public ICollection<PaymentProvider> GetAll() =>_paymentProviderRepository.GetAll();

        public void Update(PaymentProvider paymentProvider) => _paymentProviderRepository.Update(paymentProvider);
    }
}
