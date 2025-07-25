using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchesGroupsRepository : IEntityModelRepository<BranchesGroups, int>
    {
        IEnumerable<BranchesGroups> GetBranchesGroupsByGroupId(int id);
        BranchesGroups GetByGroupId(int groupId);
    }
}
