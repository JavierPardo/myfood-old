using MyFoodApp.API.Entities;
using System.Collections.Generic;
using System;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationRepository : IEntityModelRepository<Reservation, long>
    {
        IEnumerable<Reservation> GetReservationsByBranchId(int branchId);
        IEnumerable<Reservation> GetReservationsByDateAndStatusId(IEnumerable<int> statusIds, DateTime reservationDate);
        IEnumerable<Reservation> GetAllWithUsers();
        IEnumerable<Reservation> GetAllByUser(long userId);
  }
}
