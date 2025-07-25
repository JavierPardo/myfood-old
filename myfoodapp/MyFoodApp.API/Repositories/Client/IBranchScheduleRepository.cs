using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchScheduleRepository : IEntityModelRepository<BranchSchedule, int>
    {
        IEnumerable<BranchSchedule> GetAllByBranchId(int branchId);
        IEnumerable<BranchSchedule> GetByBranchAndDate(int branchId, string strDate);
    }
}
