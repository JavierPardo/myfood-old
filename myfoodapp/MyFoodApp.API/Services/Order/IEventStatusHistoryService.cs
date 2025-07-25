using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IEventStatusHistoryService
    {
        void Add(EventStatusHistory eventStatusHistory);
        void Update(EventStatusHistory eventStatusHistory);
        EventStatusHistory Get(long id);
        ICollection<EventStatusHistory> GetAll();
        void Delete(long id);
        EventStatusHistory GetStatusHistoryByEventId(long id);
    }
}
