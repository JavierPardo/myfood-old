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
    public class LogisticProviderRateRepository : EntityModelRepository<LogisticProviderRate, int>, ILogisticProviderRateRepository
    {
        public LogisticProviderRateRepository(DataContext context, ILogger<LogisticProviderRate> logger) : base(context, logger)
        {
        }

        public IEnumerable<LogisticProviderRate> GetAllByBranch(int branchId)
        {
            return _dbSet.Where(x => 
            x.LogisticProvider.BranchLogisticProviders.Any(y=>y.BranchId==branchId)
            );

        }

        public IEnumerable<LogisticProviderRate> GetAllByProvider(int logisticProviderId)
        {
            return _dbSet.Where(x =>
            x.LogisticProviderId == logisticProviderId);
        }

        public IEnumerable<LogisticProviderRate> GetAllByProviderAndActive(int logisticProviderId)
        {
            return _dbSet.Where(x =>
            x.LogisticProviderId == logisticProviderId && x.IsActive).AsNoTracking().ToList();
        }

        public LogisticProviderRate GetByDistance(decimal actualDistance, int branchId)
        {
            var logisticProvider = _dbSet.Where(x =>
             x.LogisticProvider.BranchLogisticProviders.Any(blp => blp.BranchId == branchId && blp.IsBranchDefault) &&
              (x.RateTypeId == 2 || (x.StartRange < actualDistance && actualDistance <= x.EndRange))
             ).OrderBy(x => x.StartRange).FirstOrDefault();
            if (logisticProvider != null)
            {
                return logisticProvider;
            }
            return  _dbSet.Where(x =>
              x.LogisticProvider.BranchLogisticProviders.Any(blp => blp.BranchId == branchId) &&
              (x.RateTypeId == 2 || (x.StartRange < actualDistance && actualDistance <= x.EndRange))
             ).OrderBy(x => x.StartRange).FirstOrDefault();
        }
        
    }
}
