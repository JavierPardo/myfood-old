using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IEventService
    {
        void Add(Event model);
        void Update(Event model);

        Event Get(long id);
        Event GetDetailed(long id);
        IEnumerable<Event> GetAll();
        void Delete(long id);
        IEnumerable<Event> GetEventsByDateAndStatusId(int statusId, DateTime eventDate, IEnumerable<int> eventTypeIds);
        Event UpdateStatus(long eventId, int eventStatusId);
        void CalculateCost(long eventId);
        IEnumerable<Event> GetEventsByUserId();
        //Event GetFullEvent(long eventId);
    }
}
