using System;
using System.Collections.Generic;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Services
{
    public interface IOrderItemReportService
    {
        public IEnumerable<object> GetOrderItemsByDate(DateTime fromDate, DateTime toDate);
    }

    public class OrderItemReportService : IOrderItemReportService
    {
        private readonly IOrderItemReportRepository _OrderItemReportRepository;
        private readonly IUserSession _userSession;

        public OrderItemReportService(
            IOrderItemReportRepository OrderItemReportRepository,
            IUserSession userSession
            )
        {
            _OrderItemReportRepository = OrderItemReportRepository;
            _userSession = userSession;
        }

        public IEnumerable<object> GetOrderItemsByDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _OrderItemReportRepository.GetOrderItemsByDate(fromDate, toDate, _userSession.BranchId);
            return new List<object>();
        }
    }
}
