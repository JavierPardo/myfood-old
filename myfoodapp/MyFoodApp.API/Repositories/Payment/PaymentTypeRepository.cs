using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class PaymentTypeRepository:EntityModelRepository<PaymentType,int>,IPaymentTypeRepository
    {
        public PaymentTypeRepository(DataContext dataContext, ILogger<PaymentType> logger):base(dataContext, logger)
        {

        }

        public IEnumerable<PaymentType> GetPaymentTypesByBranchId(int branchId)
        {
            return _dbSet.Where(p => p.BranchesPaymentTypes.Any(b => b.BranchId == branchId));
        }
    }
}