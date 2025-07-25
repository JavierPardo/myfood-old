using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface ILogisticProviderRepository : IEntityModelRepository<LogisticProvider, int>
    {
        IEnumerable<LogisticProvider> GetAllByBranchId(int branchId);
        IEnumerable<LogisticProvider> GetAllByClientId(int clientId);
        LogisticProvider GetWithLogisticProviderByKeyAndClientId(int id, int clientId);
        LogisticProvider GetByBranchIdDefault(int branchId);
    }
}
