using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class MenuRepository : EntityModelRepository<Menu, long>, IMenuRepository
    {
        public MenuRepository(DataContext context, ILogger<Menu> logger) : base(context, logger)
        {
        }

        public IEnumerable<Menu> GetMenuByBranchId(int branchId)
        {
            return _dbSet.Where(m => m.BranchId == branchId);
        }
    }
}