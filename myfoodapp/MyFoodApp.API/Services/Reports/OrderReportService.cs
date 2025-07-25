using System;
using System.Collections.Generic;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Services
{
    public interface IOrderReportService
    {
        public IEnumerable<Order> GetOrdersByDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<OrdersByZoneAndDateDto> GetOrdersByZoneAndDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<OrdersByGenderAndDateDto> GetOrdersByGenderAndDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<OrdersByAgeAndDateDto> GetOrdersByAgeAndDate(DateTime fromDate, DateTime toDate);
    }

    public class OrderReportService : IOrderReportService
    {
        private readonly IOrderReportRepository _orderReportRepository;
        private readonly IUserSession _userSession;

        public OrderReportService(
            IOrderReportRepository orderReportRepository,
            IUserSession userSession
            )
        {
            _orderReportRepository = orderReportRepository;
            _userSession = userSession;
        }

        public IEnumerable<Order> GetOrdersByDate(DateTime fromDate, DateTime toDate)
        {
            if(_userSession.BranchId > 0)
                return _orderReportRepository.GetOrdersByDate(fromDate, toDate, _userSession.BranchId);
            return new List<Order>();
        }

        public IEnumerable<OrdersByZoneAndDateDto> GetOrdersByZoneAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _orderReportRepository.GetOrdersByZoneAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<OrdersByZoneAndDateDto>();
        }

        public IEnumerable<OrdersByGenderAndDateDto> GetOrdersByGenderAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _orderReportRepository.GetOrdersByGenderAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<OrdersByGenderAndDateDto>();
        }

        public IEnumerable<OrdersByAgeAndDateDto> GetOrdersByAgeAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _orderReportRepository.GetOrdersByAgeAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<OrdersByAgeAndDateDto>();
        }
    }
}
