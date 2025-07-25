using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class OrderItemReportRepository : EntityModelRepository<OrderItem, long>, IOrderItemReportRepository
    {
        public OrderItemReportRepository(DataContext context, ILogger<OrderItem> logger)
            : base(context, logger)
        {
        }

        public IEnumerable<object> GetOrderItemsByDate(DateTime fromDate, DateTime toDate, int BranchId)
        {
            return _dbSet
                .Include(e => e.Item)
                .Include(e => e.Order).ThenInclude(x => x.Event).ThenInclude(e => e.EventType)
                .Where(e => e.Order.CreateOrderDateTime.Date >= fromDate.Date
                && e.Order.CreateOrderDateTime.Date <= toDate.Date
                && e.Order.Event.BranchId == BranchId)
                .GroupBy(e => new
                {
                    ItemId = e.Item.Id,
                    ItemName = e.Item.Name,
                    EventTypeName = e.Order.Event.EventType.Name
                })
                .OrderByDescending(x => x.Count())
                .Select(x => new
                {
                    ItemId = x.Key.ItemId,
                    ItemName = x.Key.ItemName,
                    TotalAmount = x.Count(),
                    EventTypeName = x.Key.EventTypeName
                })
                .ToList()
                .Select((x, index) => new
                {
                    position = index + 1,
                    ItemId = x.ItemId,
                    ItemName = x.ItemName,
                    TotalAmount = x.TotalAmount,
                    EventTypeName = x.EventTypeName
                });
        }
    }
}
