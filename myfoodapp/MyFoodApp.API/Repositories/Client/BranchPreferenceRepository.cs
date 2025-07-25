using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class BranchPreferenceRepository : EntityModelRepository<BranchPreferences, int>, IBranchPreferenceRepository
    {
        readonly DataContext _dbcontext;
        public BranchPreferenceRepository(DataContext context, ILogger<BranchPreferences> logger) : base(context, logger)
        {
            _dbcontext = context;
        }

        public IEnumerable<BranchPreferences> GetAllByCriteriaTag(string criteria)
        {
            return _dbSet.Where(b => b.PreferenceName == "Preferencias.Tags").ToList()
                .Where(b => string.IsNullOrWhiteSpace(criteria) || (!string.IsNullOrWhiteSpace(b.PreferenceValue) &&
                b.PreferenceValue.Split(',', StringSplitOptions.None).Any(x=>x.ToLower().Contains(criteria)))).ToList();
        }

        public IEnumerable<BranchPreferences> GetByBranchId(int BranchId)
        {
            return _dbcontext.BranchPreferences.Where(b => b.BranchId == BranchId);
        }

        public BranchPreferences GetByBranchIdAndName(int BranchId, string Name)
        {
            return _dbcontext.BranchPreferences.Where(b => b.BranchId == BranchId && b.PreferenceName == Name).FirstOrDefault();
        }
    }
}