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
    public class BranchesGroupsRepository : EntityModelRepository<BranchesGroups, int>, IBranchesGroupsRepository
    {
        public BranchesGroupsRepository(DataContext context, ILogger<BranchesGroups> logger) : base(context, logger)
        {
        }

        public IEnumerable<BranchesGroups> GetBranchesGroupsByGroupId(int id)
        {
            return _dbSet.Include(b => b.Branch)
                .AsNoTracking()
                .Where(bg => bg.GroupId == id);
        }

        public BranchesGroups GetByGroupId(int groupId)
        {
            return _dbSet.Include(b => b.Branch)
                .AsNoTracking()
                .FirstOrDefault(bg => bg.GroupId == groupId);
        }
    }
}