using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IPaymentTypeService
    {
        void Add(PaymentType paymentType);
        void Update(PaymentType paymentType);
        PaymentType Get(int id);
        IEnumerable<PaymentType> GetAll();
        void Delete(int id);
        IEnumerable<PaymentType> GetPaymentTypesByBranchId(int branchId);
    }
}