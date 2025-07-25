using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class ReservationStatusHistoryRepository : EntityModelRepository<ReservationStatusHistory, long>, IReservationStatusHistoryRepository
    {
        public ReservationStatusHistoryRepository(DataContext context, ILogger<ReservationStatusHistory> logger) : base(context, logger)
        {
        }

        public ReservationStatusHistory GetStatusHistoryByReservationId(long id)
        {
            return _dbSet.FirstOrDefault(x => x.ReservationId == id);
        }
    }
}
