using MyFoodApp.API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationService
    {
        void Add(Reservation reservation);
        void Update(Reservation reservation);
        Reservation UpdateStatus(long id, int newStatus);
        Task<Reservation> Get(long id);
        IEnumerable<Reservation> GetReservationsByDateAndStatusId(IEnumerable<int> statusId, DateTime reservationDate);
        ICollection<Reservation> GetAll();
        void Delete(long id);
        IEnumerable<Reservation> GetReservationsByBranchId(int branchId);
        void AddUserReservation(Reservation reservation);
        IEnumerable<Reservation> GetUserReservations();
  }
}
