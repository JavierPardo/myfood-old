using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IEventRepository : IEntityModelRepository<Event, long>
    {
        IEnumerable<Event> GetEventsByDateAndStatusId(int statusId, DateTime eventDate, IEnumerable<int> eventTypeIds);
        Event GetCompleteById(long eventId, Boolean addUserData);
        IEnumerable<Event> GetEventsByUserId(long userId);
        Event GetById(long id);
    }
}
