using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class BranchesEventsTypeRepository : EntityModelRepository<BranchesEventTypes, int>, IBranchesEventTypesRepository
    {
        public BranchesEventsTypeRepository(DataContext context, ILogger<BranchesEventTypes> logger) : base(context, logger)
        {
        }

        public IEnumerable<BranchesEventTypes> GetAllByBranchId(int branchId)
        {
            return _dbSet.Include(b => b.Branch)
                .AsNoTracking()
                .Where(bg => bg.BranchId == branchId).ToList();
        }

        public IEnumerable<BranchesEventTypes> GetBranchesEventTypesByEventTypeId(int id, int branchGroupId)
        {
            return _dbSet.Include(b => b.Branch)
                .AsNoTracking()
                .Where(bg => bg.EventTypeId == id
                && (branchGroupId==0||bg.Branch.BranchesGroups.Any(x=>x.GroupId==branchGroupId)));
        }


    }
}