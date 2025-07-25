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
    public class BranchScheduleRepository : EntityModelRepository<BranchSchedule, int>, IBranchScheduleRepository
    {
        public BranchScheduleRepository(DataContext context, ILogger<BranchSchedule> logger) : base(context, logger)
        {
        }

        public IEnumerable<BranchSchedule> GetAllByBranchId(int branchId)
        {
            return _dbSet.Where(branchSchedule => branchSchedule.BranchId == branchId);
        }

        public IEnumerable<BranchSchedule> GetByBranchAndDate(int branchId, string strDate)
        {
            DayOfWeek weekday = DateTime.ParseExact(strDate, "yyyyMMdd", CultureInfo.InvariantCulture).DayOfWeek;
            return _dbSet.Where(day => day.BranchId == branchId && day.Day == weekday);
        }

    }
}