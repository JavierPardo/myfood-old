using System;
using System.Collections.Generic;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderReportRepository : IEntityModelRepository<Order,long>
    {
        IEnumerable<Order> GetOrdersByDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<Order> GetOrdersRejectedByDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<Order> GetOperationalTimesByDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<OrdersByZoneAndDateDto> GetOrdersByZoneAndDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<OrdersByGenderAndDateDto> GetOrdersByGenderAndDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<OrdersByAgeAndDateDto> GetOrdersByAgeAndDate(DateTime fromDate, DateTime toDate, int BranchId);
    }
}
