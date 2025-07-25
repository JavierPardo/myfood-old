using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class BranchLogisticProviderRepository : EntityModelRepository<BranchLogisticProvider, int>, IBranchLogisticProviderRepository
    {
        public BranchLogisticProviderRepository(DataContext context, ILogger<BranchLogisticProvider> logger) : base(context, logger)
        {
        }

        public BranchLogisticProvider GetByBranchId(int branchId)
        {
            return _dbSet.FirstOrDefault(x => x.IsBranchDefault && x.BranchId == branchId);
        }

        public BranchLogisticProvider GetByBranchIdLogisticProviderId(int branchId, int logisticProviderId)
        {
            return _dbSet.FirstOrDefault(x => x.BranchId == branchId && x.LogisticProviderId == logisticProviderId);
        }
    }
}
