using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationStatusService
    {
        void Add(ReservationStatus reservationStatus);
        void Update(ReservationStatus reservationStatus);
        ReservationStatus Get(int id);
        ICollection<ReservationStatus> GetAll();
        void Delete(int id);
    }
}
