using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class EventStatusHistoryRepository : EntityModelRepository<EventStatusHistory, long>, IEventStatusHistoryRepository
    {
        public EventStatusHistoryRepository(DataContext context, ILogger<EventStatusHistory> logger) : base(context, logger)
        {
        }

        public EventStatusHistory GetStatusHistoryByEventId(long id)
        {
            return _dbSet.FirstOrDefault(x => x.EventId == id);
        }
    }
}
