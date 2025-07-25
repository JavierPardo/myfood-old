using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ILogisticProviderRateRepository : IEntityModelRepository<LogisticProviderRate, int>
    {
        LogisticProviderRate GetByDistance(decimal actualDistance, int branchId);
        IEnumerable<LogisticProviderRate> GetAllByBranch(int branchId);
        IEnumerable<LogisticProviderRate> GetAllByProvider(int logisticProviderId);
        IEnumerable<LogisticProviderRate> GetAllByProviderAndActive(int logisticProviderId);

    }
}
