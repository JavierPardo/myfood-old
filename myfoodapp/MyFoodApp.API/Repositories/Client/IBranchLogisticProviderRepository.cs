using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public interface IBranchLogisticProviderRepository : IEntityModelRepository<BranchLogisticProvider,int>
    {
        BranchLogisticProvider GetByBranchId(int branchId);
        BranchLogisticProvider GetByBranchIdLogisticProviderId(int branchId, int id);
    }
}
