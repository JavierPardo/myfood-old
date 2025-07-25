using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public interface ILogisticProviderBranchRepository : IEntityModelRepository<BranchLogisticProvider, int>
    {
        BranchLogisticProvider GetByBranchIdAndLogisticProvider(int branchId, int logisticProviderId);
        BranchLogisticProvider GetDefaultByBranchId(int branchId);
        void DeActivateLogisticProvider(int logisticProviderId);
    }
}
