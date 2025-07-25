using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class LogisticProviderBranchRepository : EntityModelRepository<BranchLogisticProvider, int>, ILogisticProviderBranchRepository
    {
        public LogisticProviderBranchRepository(DataContext context, ILogger<BranchLogisticProvider> logger) : base(context, logger)
        {
        }

        public void DeActivateLogisticProvider(int logisticProviderId)
        {
            var lgs=_dbSet.AsNoTracking()
                .Where(x => 
            x.LogisticProviderId == logisticProviderId
            ).ToList();
            foreach (var lgb in lgs)
            {
                lgb.IsBranchDefault = false;
                Update(lgb);
            }
        }

        public BranchLogisticProvider GetByBranchIdAndLogisticProvider(int branchId, int logisticProviderId)
        {
            return _dbSet.FirstOrDefault(x => x.BranchId == branchId
            && x.LogisticProviderId == logisticProviderId
            );
        }
        public BranchLogisticProvider GetDefaultByBranchId(int branchId)
        {
            return _dbSet.FirstOrDefault(x =>
            x.IsBranchDefault
            && x.BranchId == branchId
            );
        }
    }
}
