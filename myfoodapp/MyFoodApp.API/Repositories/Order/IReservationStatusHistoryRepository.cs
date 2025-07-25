using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IReservationStatusHistoryRepository : IEntityModelRepository<ReservationStatusHistory, long>
    {
        ReservationStatusHistory GetStatusHistoryByReservationId(long id);
    }
}
