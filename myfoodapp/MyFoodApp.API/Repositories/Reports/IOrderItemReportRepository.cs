using System;
using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderItemReportRepository : IEntityModelRepository<OrderItem,long>
    {
        public IEnumerable<object> GetOrderItemsByDate(DateTime fromDate, DateTime toDate, int BranchId);
    }
}
