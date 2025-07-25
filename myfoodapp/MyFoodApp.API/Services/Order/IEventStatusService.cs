using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IEventStatusService
    {
        void Add(EventStatus eventStatus);
        void Update(EventStatus eventStatus);
        EventStatus Get(int id);
        ICollection<EventStatus> GetAll();
        void Delete(int id);
    }
}
