using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationStatusHistoryService
    {
        void Add(ReservationStatusHistory reservationStatusHistory);
        void Update(ReservationStatusHistory reservationStatusHistory);
        ReservationStatusHistory Get(long id);
        ICollection<ReservationStatusHistory> GetAll();
        void Delete(long id);
        ReservationStatusHistory GetStatusHistoryByReservationId(long id);
    }
}
