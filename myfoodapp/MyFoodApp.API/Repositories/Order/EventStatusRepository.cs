using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class EventStatusRepository : EntityModelRepository<EventStatus, int>, IEventStatusRepository
    {
        public EventStatusRepository(DataContext context, ILogger<EventStatus> logger) : base(context, logger)
        {
        }
    }
}
