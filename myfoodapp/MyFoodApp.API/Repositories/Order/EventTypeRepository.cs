using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class EventTypeRepository : EntityModelRepository<EventType, int>, IEventTypeRepository
    {
        public EventTypeRepository(DataContext context, ILogger<EventType> logger) : base(context, logger)
        {
        }
    }
}
