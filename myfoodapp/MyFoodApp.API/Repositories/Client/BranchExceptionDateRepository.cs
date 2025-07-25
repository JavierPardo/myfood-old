using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class BranchExceptionDateRepository : EntityModelRepository<BranchExceptionDate, int>, IBranchExceptionDateRepository
    {
        public BranchExceptionDateRepository(DataContext context, ILogger<BranchExceptionDate> logger) : base(context, logger)
        {
        }

        public IEnumerable<BranchExceptionDate> GetAllByBranchId(int branchId)
        {
            return _dbSet.Where(exceptionDate => exceptionDate.BranchId == branchId);
        }

        public IEnumerable<BranchExceptionDate> GetByBranchAndDate(int branchId, string strDate)
        {
            DateTime exceptionDate = DateTime.ParseExact(strDate, "yyyyMMdd", CultureInfo.InvariantCulture);
            return _dbSet.Where(date => date.BranchId == branchId && date.ExceptionDate == exceptionDate);
        }

    }
}