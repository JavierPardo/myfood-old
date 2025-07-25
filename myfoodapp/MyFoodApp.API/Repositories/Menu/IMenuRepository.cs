using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IMenuRepository : IEntityModelRepository<Menu, long>
    {
        IEnumerable<Menu> GetMenuByBranchId(int branchId);
    }
}
