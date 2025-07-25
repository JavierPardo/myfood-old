using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IPaymentProviderService
    {
        void Add(PaymentProvider PaymentProvider);
        void Update(PaymentProvider PaymentProvider);
        PaymentProvider Get(int id);
        ICollection<PaymentProvider> GetAll();
        void Delete(int id);
    }
}
