using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationSpecialEventRepository : IEntityModelRepository<ReservationSpecialEvent, long>
    {
        ReservationSpecialEvent GetSpecialEventsByBranchId(int branchId);
        IEnumerable<ReservationSpecialEvent> GetFutureEvents();
        ICollection<ReservationSpecialEvent> GetActives();
  }
}
