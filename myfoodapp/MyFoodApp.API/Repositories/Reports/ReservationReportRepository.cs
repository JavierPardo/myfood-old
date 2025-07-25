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
    public class ReservationReportRepository : EntityModelRepository<Reservation, long>, IReservationReportRepository
    {
        public ReservationReportRepository(DataContext context, ILogger<Reservation> logger)
            : base(context, logger)
        {
        }

        public IEnumerable<Reservation> GetReservationsByDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(r => r.SpecialEvent)
                .Where(r => r.ReservationDateTime.Date >= fromDate.Date
                && r.ReservationDateTime.Date <= toDate.Date
                && r.BranchId == BranchId);
        }

        public IEnumerable<Reservation> GetReservationsRejectedByDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(r => r.SpecialEvent)
                .Include(r => r.Event).ThenInclude(o => o.EventType)
                .Where(r => r.ReservationDateTime.Date >= fromDate.Date
                && r.ReservationDateTime.Date <= toDate.Date
                && r.CurrentStatusId == 3
                && r.BranchId == BranchId);
        }

        public IEnumerable<ReservationsByZoneAndDateDto> GetReservationsByZoneAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(r => r.User)
                .Where(o => o.ReservationDateTime.Date >= fromDate.Date
                        && o.ReservationDateTime.Date <= toDate.Date
                        && o.BranchId == BranchId
                        && o.User.Locations.Where(l => l.Notes == "HOME").Count() > 0)
                .GroupBy(o => o.User.Locations.Where(l => l.Notes == "HOME").FirstOrDefault().ZoneId)
                .Select(g => new ReservationsByZoneAndDateDto { ZoneId = g.Key.Value, Amount = g.Count() })
                .ToList();
        }

        public IEnumerable<ReservationsByGenderAndDateDto> GetReservationsByGenderAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.User)
                .Where(o => o.ReservationDateTime.Date >= fromDate.Date
                        && o.ReservationDateTime.Date <= toDate.Date
                        && o.BranchId == BranchId)
                .GroupBy(o => o.User.Gender)
                .Select(g => new ReservationsByGenderAndDateDto { GenderId = (long)g.Key, Amount = g.Count() })
                .ToList();
        }

        public IEnumerable<ReservationsByAgeAndDateDto> GetReservationsByAgeAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.User)
                .Where(o => o.ReservationDateTime.Date >= fromDate.Date
                        && o.ReservationDateTime.Date <= toDate.Date
                        && o.BranchId == BranchId)
                .GroupBy(o => o.User.DOB.Year)
                .Select(g => new ReservationsByAgeAndDateDto { Age = DateTime.Now.Year - g.Key, Amount = g.Count() })
                .ToList();
        }
    }
}
