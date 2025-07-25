using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class OrderReportRepository : EntityModelRepository<Entities.Order, long>, IOrderReportRepository
    {
        public OrderReportRepository(DataContext context, ILogger<Entities.Order> logger)
            : base(context, logger)
        {
        }

        public IEnumerable<Entities.Order> GetOrdersByDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.OrderItems)
                .Include(o => o.Event).ThenInclude(o => o.AppUser)
                .Include(o => o.Event).ThenInclude(o => o.EventType)
                .Include(o => o.Event).ThenInclude(o => o.Transactions)
                .Include(o => o.Event).ThenInclude(o => o.Transactions).ThenInclude(o => o.ClientPayment)
                .Where(e => e.CreateOrderDateTime.Date >= fromDate.Date
                && e.CreateOrderDateTime.Date <= toDate.Date
                && e.Event.BranchId == BranchId);
        }

        public IEnumerable<Entities.Order> GetOrdersRejectedByDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.Event).ThenInclude(o => o.EventType)
                .Include(o => o.OrderStatusHistories)
                .Where(e => e.CreateOrderDateTime.Date >= fromDate.Date
                && e.CreateOrderDateTime.Date <= toDate.Date
                && e.CurrentStatusId == (int)OrderStatusEnum.Rejected
                && e.Event.BranchId == BranchId);
        }

        public IEnumerable<Entities.Order> GetOperationalTimesByDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.Event).ThenInclude(o => o.EventType)
                .Include(o => o.OrderStatus)
                .Include(o => o.OrderStatusHistories)
                .Where(e => e.CreateOrderDateTime.Date >= fromDate.Date
                && e.CreateOrderDateTime.Date <= toDate.Date
                && (e.CurrentStatusId == (int)OrderStatusEnum.ReadyToDispatch
                || e.CurrentStatusId == (int)OrderStatusEnum.Dispatched
                || e.CurrentStatusId == (int)OrderStatusEnum.Delivered
                || e.CurrentStatusId == (int)OrderStatusEnum.Rejected)
                && e.Event.BranchId == BranchId);
        }

        public IEnumerable<OrdersByZoneAndDateDto> GetOrdersByZoneAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.Event)
                .ThenInclude(e => e.DestinationLocation)
                //.ThenInclude(o => o.Zone)
                .Where(o => o.CreateOrderDateTime.Date >= fromDate.Date
                        && o.CreateOrderDateTime.Date <= toDate.Date
                        && o.Event.BranchId == BranchId
                        && o.Event.DestinationLocationId.HasValue
                        && o.Event.DestinationLocation.ZoneId.HasValue)
                .GroupBy(o => o.Event.DestinationLocation.ZoneId)
                .Select(g => new OrdersByZoneAndDateDto { ZoneId = g.Key.Value, Amount = g.Count() })
                .ToList();
        }

        public IEnumerable<OrdersByGenderAndDateDto> GetOrdersByGenderAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.Event).ThenInclude(e => e.AppUser)
                .Where(o => o.CreateOrderDateTime.Date >= fromDate.Date
                        && o.CreateOrderDateTime.Date <= toDate.Date
                        && o.Event.BranchId == BranchId
                        && o.Event.AppUser != null)
                .GroupBy(o => o.Event.AppUser.Gender)
                .Select(g => new OrdersByGenderAndDateDto { GenderId = (long) g.Key, Amount = g.Count() })
                .ToList();
        }

        public IEnumerable<OrdersByAgeAndDateDto> GetOrdersByAgeAndDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(o => o.Event).ThenInclude(e => e.AppUser)
                .Where(o => o.CreateOrderDateTime.Date >= fromDate.Date
                        && o.CreateOrderDateTime.Date <= toDate.Date
                        && o.Event.BranchId == BranchId
                        && o.Event.AppUser != null)
                .GroupBy(o => o.Event.AppUser.DOB.Year)
                .Select(g => new OrdersByAgeAndDateDto { Age = DateTime.Now.Year - g.Key, Amount = g.Count() })
                .ToList();
        }
    }
}
