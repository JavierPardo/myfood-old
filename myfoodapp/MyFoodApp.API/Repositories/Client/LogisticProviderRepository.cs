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
    public class LogisticProviderRepository : EntityModelRepository<LogisticProvider, int>, ILogisticProviderRepository
    {
        public LogisticProviderRepository(DataContext context, ILogger<LogisticProvider> logger) : base(context, logger)
        {
            
        }
        public LogisticProvider GetByKey(int id)
        {
            var logisticProvider = _dbSet
                .Include(x => x.BranchLogisticProviders)                
                .Where(x => x.Id == id)
                .FirstOrDefault();
            if (logisticProvider.BranchLogisticProviders != null)
            {
                foreach (var item in logisticProvider.BranchLogisticProviders)
                {
                    item.LogisticProvider = null;                    
                }
            }
            return logisticProvider;                            
        }

        public LogisticProvider GetWithLogisticProviderByKeyAndClientId(int id,int clientId)
        {
            var logisticProvider = _dbSet
                .Include(x => x.BranchLogisticProviders)
                .Where(x => x.BranchLogisticProviders
                .Any(bl => bl.Branch.ClientId == clientId) && x.Id==id)                
                .FirstOrDefault();

            if (logisticProvider.BranchLogisticProviders != null)
            {
                foreach (var item in logisticProvider.BranchLogisticProviders)
                {
                    item.LogisticProvider = null;
                }
            }
            return logisticProvider;
        }

        public IEnumerable<LogisticProvider> GetAllByClientId(int clientId)
        {
            return _dbSet
                .Where(x => x.BranchLogisticProviders.Any(bl => bl.Branch.ClientId == clientId)).ToList();
        }
        public IEnumerable<LogisticProvider> GetAllByBranchId(int branchId)
        {
            
            return _dbSet
                .AsNoTracking()
                .Include(x=>x.BranchLogisticProviders)
                
                .Where(x => x.BranchLogisticProviders.Any(bl => bl.BranchId == branchId)).ToList() ;
        }

        public LogisticProvider GetByBranchIdDefault(int branchId)
        {
            return _dbSet
                .FirstOrDefault(x => x.BranchLogisticProviders.Any(bl => bl.BranchId == branchId&&bl.IsBranchDefault));
        }

    }
}