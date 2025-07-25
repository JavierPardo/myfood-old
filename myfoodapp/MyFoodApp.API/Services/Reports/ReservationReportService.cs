using System;
using System.Collections.Generic;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Services
{
    public interface IReservationReportService
    {
        public IEnumerable<Reservation> GetReservationsByDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<ReservationsByZoneAndDateDto> GetReservationsByZoneAndDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<ReservationsByGenderAndDateDto> GetReservationsByGenderAndDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<ReservationsByAgeAndDateDto> GetReservationsByAgeAndDate(DateTime fromDate, DateTime toDate);
    }

    public class ReservationReportService : IReservationReportService
    {
        private readonly IReservationReportRepository _reservationReportRepository;
        private readonly IUserSession _userSession;

        public ReservationReportService(
            IReservationReportRepository reservationReportRepository,
            IUserSession userSession
            )
        {
            _reservationReportRepository = reservationReportRepository;
            _userSession = userSession;
        }

        public IEnumerable<Reservation> GetReservationsByDate(DateTime fromDate, DateTime toDate)
        {
            if(_userSession.BranchId > 0)
                return _reservationReportRepository.GetReservationsByDate(fromDate, toDate, _userSession.BranchId);
            return new List<Reservation>();
        }

        public IEnumerable<ReservationsByZoneAndDateDto> GetReservationsByZoneAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _reservationReportRepository.GetReservationsByZoneAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<ReservationsByZoneAndDateDto>();
        }

        public IEnumerable<ReservationsByGenderAndDateDto> GetReservationsByGenderAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _reservationReportRepository.GetReservationsByGenderAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<ReservationsByGenderAndDateDto>();
        }

        public IEnumerable<ReservationsByAgeAndDateDto> GetReservationsByAgeAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _reservationReportRepository.GetReservationsByAgeAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<ReservationsByAgeAndDateDto>();
        }
    }
}
