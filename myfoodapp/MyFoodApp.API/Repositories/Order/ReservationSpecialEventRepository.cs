using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class ReservationSpecialEventRepository : EntityModelRepository<ReservationSpecialEvent, long>, IReservationSpecialEventRepository
    {
        public ReservationSpecialEventRepository(DataContext context, ILogger<ReservationSpecialEvent> logger) : base(context, logger)
        {
        }

        public ReservationSpecialEvent GetSpecialEventsByBranchId(int branchId)
        {
            return _dbSet.FirstOrDefault(x => x.BranchId==branchId);
        }

        public IEnumerable<ReservationSpecialEvent> GetFutureEvents()
        {
            var currentDate = DateTime.Now.Date;
            return _dbSet.AsNoTracking().Where(e => e.EndDateTime > currentDate).ToList();
        }

        public ICollection<ReservationSpecialEvent> GetActives()
        {
            return _dbSet.AsNoTracking().Where(e => e.IsActive).ToList();
        }
  }
}