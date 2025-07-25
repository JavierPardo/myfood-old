using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationSpecialEventService
    {
        void Add(ReservationSpecialEvent reservationSpecialEvent);
        void Update(ReservationSpecialEvent reservationSpecialEvent);
        ReservationSpecialEvent Get(long id);
        IEnumerable<ReservationSpecialEvent> GetAll(bool activesOnly);
        void Delete(long id);
        ReservationSpecialEvent GetSpecialEventsByBranchId(int branchId);
        IEnumerable<ReservationSpecialEvent> GetFutureEvents();
        void UpdateIsActiveFlag(ReservationSpecialEvent reservationSpecialEvent);
  }
}
