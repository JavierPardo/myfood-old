using MyFoodApp.API.Entities;
using MyFoodApp.API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchPreferenceRepository : IEntityModelRepository<BranchPreferences, int>
    {
        IEnumerable<BranchPreferences> GetByBranchId(int BranchId);
        BranchPreferences GetByBranchIdAndName(int BranchId, string Name);
        IEnumerable<BranchPreferences> GetAllByCriteriaTag(string criteria);
    }
}
