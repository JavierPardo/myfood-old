using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class UserReportRepository : EntityModelRepository<User, long>, IUserReportRepository
    {
        public UserReportRepository(DataContext context, ILogger<User> logger)
            : base(context, logger)
        {
        }

        public IEnumerable<UsersByZoneAndDateDto> GetUsersByZoneAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(r => r.Locations)
                .ThenInclude(o => o.Zone)
                .Where(o => o.RegistrationDate.Date >= fromDate.Date
                    && o.RegistrationDate.Date <= toDate.Date
                    && o.Locations.Where(l => l.Notes == "HOME").Count() > 0
                    && o.Events.Where(l => l.BranchId == BranchId).Count() > 0
                    )
                .GroupBy(o => o.Locations.Where(l => l.Notes == "HOME").FirstOrDefault().ZoneId)
                .Select(g => new UsersByZoneAndDateDto { ZoneId = g.Key.Value, Amount = g.Count() })
                .ToList();
        }

        public IEnumerable<UsersByGenderAndDateDto> GetUsersByGenderAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(r => r.Events)
                .Where(o => o.RegistrationDate.Date >= fromDate.Date
                    && o.RegistrationDate.Date <= toDate.Date
                    && o.Events.Where(l => l.BranchId == BranchId).Count() > 0
                )
                .GroupBy(o => o.Gender)
                .Select(g => new UsersByGenderAndDateDto { GenderId = (long)g.Key, Amount = g.Count() })
                .ToList();
        }

        public IEnumerable<UsersByAgeAndDateDto> GetUsersByAgeAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.Events)
                .Where(o => o.RegistrationDate.Date >= fromDate.Date
                    && o.RegistrationDate.Date <= toDate.Date
                    && o.Events.Where(l => l.BranchId == BranchId).Count() > 0
                )
               .GroupBy(o => o.DOB.Year)
                .Select(g => new UsersByAgeAndDateDto { Age = DateTime.Now.Year - g.Key, Amount = g.Count() })
                .ToList();
        }
    }
}
