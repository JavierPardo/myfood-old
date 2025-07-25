using System;
using System.Collections.Generic;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationReportRepository : IEntityModelRepository<Reservation,long>
    {
        IEnumerable<Reservation> GetReservationsByDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<Reservation> GetReservationsRejectedByDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<ReservationsByZoneAndDateDto> GetReservationsByZoneAndDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<ReservationsByGenderAndDateDto> GetReservationsByGenderAndDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<ReservationsByAgeAndDateDto> GetReservationsByAgeAndDate(DateTime fromDate, DateTime toDate, int BranchId);
    }
}
