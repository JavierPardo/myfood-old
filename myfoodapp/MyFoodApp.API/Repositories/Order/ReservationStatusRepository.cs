using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class ReservationStatusRepository : EntityModelRepository<ReservationStatus, int>, IReservationStatusRepository
    {
        public ReservationStatusRepository(DataContext context, ILogger<ReservationStatus> logger) : base(context, logger)
        {
        }
    }
}
