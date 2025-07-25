using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Services
{
    public interface IOperationalReportService
    {
        public OperationalsDetailByDateReportDto GetOperationalByDate(DateTime fromDate, DateTime toDate);
        public OperationalsTimesByDateReportDto GetOperationalTimesByDate(DateTime fromDate, DateTime toDate);
    }

    public class OperationalReportService : IOperationalReportService
    {
        private readonly IReservationReportRepository _reservationReportRepository;
        private readonly IOrderReportRepository _orderReportRepository;
        private readonly IUserSession _userSession;
        private readonly IMapper _mapper;

        public OperationalReportService(
            IReservationReportRepository reservationReportRepository,
            IOrderReportRepository orderReportRepository,
            IUserSession userSession,
            IMapper mapper
            )
        {
            _reservationReportRepository = reservationReportRepository;
            _orderReportRepository = orderReportRepository;
            _userSession = userSession;
            _mapper = mapper;
        }

        public OperationalsDetailByDateReportDto GetOperationalByDate(DateTime fromDate, DateTime toDate)
        {
            if(_userSession.BranchId > 0)
            {
                IEnumerable<Reservation> reservations = _reservationReportRepository.GetReservationsRejectedByDate(fromDate, toDate, _userSession.BranchId);
                IEnumerable<Order> orders = _orderReportRepository.GetOrdersRejectedByDate(fromDate, toDate, _userSession.BranchId);

                IEnumerable<OperationalDetailByDateReportDto> operationalsDetailByDateReport = _mapper.Map<IEnumerable<OperationalDetailByDateReportDto>>(reservations)
                    .Concat(_mapper.Map<IEnumerable<OperationalDetailByDateReportDto>>(orders));

                return _mapper.Map<OperationalsDetailByDateReportDto>(operationalsDetailByDateReport);
            }
            return new OperationalsDetailByDateReportDto();
        }

        public OperationalsTimesByDateReportDto GetOperationalTimesByDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
            {
                IEnumerable<Order> orders = _orderReportRepository.GetOperationalTimesByDate(fromDate, toDate, _userSession.BranchId);

                IEnumerable<OperationalTimesByDateReportDto> operationalsTimesByDateReport = _mapper.Map<IEnumerable<OperationalTimesByDateReportDto>>(orders);

                return _mapper.Map<OperationalsTimesByDateReportDto>(operationalsTimesByDateReport);
            }
            return new OperationalsTimesByDateReportDto();
        }
    }
}
