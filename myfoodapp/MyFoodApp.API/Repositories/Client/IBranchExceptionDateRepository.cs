using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchExceptionDateRepository : IEntityModelRepository<BranchExceptionDate, int>
    {
        IEnumerable<BranchExceptionDate> GetAllByBranchId(int branchId);
        IEnumerable<BranchExceptionDate> GetByBranchAndDate(int branchId, string strDate);
    }
}
