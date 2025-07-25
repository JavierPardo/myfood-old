using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System;

namespace MyFoodApp.API.Repositories
{
    public class ReservationRepository:EntityModelRepository<Reservation, long>,IReservationRepository
    {
        public ReservationRepository(DataContext dataContext, ILogger<Reservation> logger):base(dataContext, logger)
        {

        }

        public IEnumerable<Reservation> GetReservationsByBranchId(int branchId)
        {
            return _dbSet.Where(r => r.BranchId == branchId);
        }

        public IEnumerable<Reservation> GetReservationsByDateAndStatusId(IEnumerable<int> statusIds, DateTime reservationDate)
        {
            return _dbSet
                .Include(r => r.User)
                .Include(r => r.Event).ThenInclude(e => e.Orders)
                .Include(r => r.Event).ThenInclude(e => e.Orders).ThenInclude(o => o.OrderStatus)
                .Include(r => r.Event).ThenInclude(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.Item)
                .Include(r => r.Event).ThenInclude(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedSides).ThenInclude(i => i.Side)
                .Include(r => r.Event).ThenInclude(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedOptions).ThenInclude(i => i.Option)
                .Include(r => r.Event).ThenInclude(e => e.Orders).ThenInclude(o => o.OrderExtras).ThenInclude(i => i.Side)
                .Where(r => statusIds.Contains(r.CurrentStatusId) && r.ReservationDateTime.Date == reservationDate.Date)
                .OrderByDescending(r => r.ReservationDateTime);
        }

        public IEnumerable<Reservation> GetAllWithUsers() 
        {
            return _dbSet.AsNoTracking().Include(e => e.User).ToList();
        }

        public IEnumerable<Reservation> GetAllByUser(long userId)
        {
            return _dbSet.Where(r => r.UserId == userId);
        }
  }
}
