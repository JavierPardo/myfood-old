using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchesEventTypesRepository : IEntityModelRepository<BranchesEventTypes, int>
    {
        IEnumerable<BranchesEventTypes> GetBranchesEventTypesByEventTypeId(int id, int branchGroupId);
        IEnumerable<BranchesEventTypes> GetAllByBranchId(int id);
    }
}
