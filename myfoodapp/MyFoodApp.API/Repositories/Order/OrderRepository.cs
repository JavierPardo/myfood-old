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
    public class OrderRepository : EntityModelRepository<Entities.Order, long>, IOrderRepository
    {
        public OrderRepository(DataContext context, ILogger<Entities.Order> logger) : base(context, logger)
        {
        }

        public IEnumerable<Entities.Order> GetAllByEventId(long eventId)
        {
            return _dbSet
                .Where(o => o.EventId == eventId).ToList();
        }

        public IEnumerable<Entities.Order> GetAllByEventIdAndStatus(long eventId, IEnumerable<int> statuses)
        {
            return _dbSet
                .Where(o => o.EventId == eventId && statuses.Contains(o.CurrentStatusId)).ToList();
        }

        public Entities.Order GetAllCompleteById(long id)
        {
            return _dbSet
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.SelectedSides)
                .ThenInclude(oi => oi.Side)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.SelectedOptions)
                .ThenInclude(oi => oi.Option)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Item)
                .FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Entities.Order> GetOrdersByBranchId(int branchId)
        {
            return _dbSet.Where(o => o.Event.BranchId == branchId);
        }

        public IEnumerable<Entities.Order> GetOrdersByEventId(long eventId)
        {
            return _dbSet.Where(o => o.EventId == eventId);
        }

        public IEnumerable<Entities.Order> GetByDateAndStatus(IEnumerable<int> statusIds, DateTime orderDate, IEnumerable<int> eventTypeIds)
        {
            return _dbSet
                .Include(o => o.OrderStatus)
                .Include(o => o.OrderItems).ThenInclude(i => i.Item)
                .Include(o => o.OrderItems).ThenInclude(i => i.SelectedSides).ThenInclude(i => i.Side)
                .Include(o => o.OrderItems).ThenInclude(i => i.SelectedOptions).ThenInclude(i => i.Option)
                .Include(o => o.OrderExtras).ThenInclude(i => i.Side)
                .Include(o => o.Event).ThenInclude(e => e.EventType)
                .Include(o => o.Event).ThenInclude(e => e.AppUser)
                .Include(o => o.Event).ThenInclude(e => e.DestinationLocation)
                .Include(o => o.Event).ThenInclude(e => e.DestinationLocation).ThenInclude(o => o.Zone)
                .Include(o => o.Event).ThenInclude(e => e.DestinationLocation).ThenInclude(o => o.City)
                .Include(o => o.Event).ThenInclude(e => e.DestinationLocation).ThenInclude(o => o.Country)
                .Include(o => o.Event).ThenInclude(e => e.Transactions).ThenInclude(o => o.PaymentType)
                .Where(o => statusIds.Contains(o.CurrentStatusId) && o.CreateOrderDateTime.Date == orderDate.Date && eventTypeIds.Contains(o.Event.EventType.Id))

                .OrderByDescending(o => o.CreateOrderDateTime);
        }
    }
}
