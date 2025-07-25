using System;
using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IPaymentTypeRepository : IEntityModelRepository<PaymentType, int>
    {
        IEnumerable<PaymentType> GetPaymentTypesByBranchId(int branchId);
    }
}