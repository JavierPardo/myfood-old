using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using Newtonsoft.Json;

namespace MyFoodApp.API.Repositories
{
    public class EventRepository : EntityModelRepository<Event, long>, IEventRepository
    {
        public EventRepository(DataContext context, ILogger<Event> logger) : base(context, logger)
        {

        }

        public Event GetCompleteById(long eventId, Boolean addUserData)
        {
            IQueryable<Event> query = _dbSet.AsQueryable();
            query = query.Include(e => e.EventType);
            query = query.Include(e => e.Branch);
            query = query.Include(e => e.DestinationLocation);
            query = query.Include(e => e.Transactions);
            if (addUserData)
            {               
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderStatus);
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderExtras).ThenInclude(i => i.Side);
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.Item);
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedSides).ThenInclude(i => i.Side);
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedOptions).ThenInclude(i => i.Option);
                query = query.Include(e => e.AppUser);
                query = query.Include(e => e.DestinationLocation).ThenInclude(o => o.Zone).ThenInclude(o => o.City).ThenInclude(o => o.Country);
            }
            else
            {
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedSides);
                query = query.Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedOptions);
            }
            //query.Include(e=>e.Coupon)
            return query.FirstOrDefault(e => e.Id == eventId);
        }

        public override ICollection<Event> GetAll()
        {
            return _dbSet
                .Include(e => e.AppUser)
                .ToList();
        }

        public IEnumerable<Event> GetEventsByDateAndStatusId(int statusId, DateTime eventDate, IEnumerable<int> eventTypeIds)
        {
            return _dbSet
                .Include(e=>e.EventType)
                .Include(e=>e.AppUser)
                .Include(e => e.Transactions).ThenInclude(o => o.PaymentType)
                .Include(e => e.Orders).ThenInclude(o => o.OrderStatus)
                .Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.Item)
                .Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedSides).ThenInclude(i => i.Side)
                .Include(e => e.Orders).ThenInclude(o => o.OrderItems).ThenInclude(i => i.SelectedOptions).ThenInclude(i => i.Option)
                .Include(e => e.Orders).ThenInclude(o => o.OrderExtras).ThenInclude(i => i.Side)
                .Where(e => e.CurrentStatusId == statusId && e.StartDateTime.Date == eventDate.Date && eventTypeIds.Contains(e.EventType.Id) && e.Orders.FirstOrDefault<Entities.Order>(o => o.OrderStatus.Id == statusId)!= null);
        }   

        public IEnumerable<Event> GetEventsByUserId(long userId)
        {
            return _dbSet.Where(e => e.AppUserId == userId).OrderByDescending(e => e.StartDateTime).Take(10);
        }

        public Event GetById(long id)
        {
            return _dbSet
                .Include(x => x.EventType)
                .Include(x => x.Transactions)
                .Include(x => x.Orders)
                .ThenInclude(x => x.OrderItems)
                //.ThenInclude(x => x.Item)
                .Include(x => x.Orders)
                .ThenInclude(x => x.OrderItems)
                .ThenInclude(x => x.SelectedSides)
                //.ThenInclude(x => x.Side)
                .Include(x => x.Orders)
                .ThenInclude(x => x.OrderItems)
                .ThenInclude(x => x.SelectedOptions)
                //.ThenInclude(x => x.Option)
                .FirstOrDefault(e => e.Id == id);

        }

    }
}
