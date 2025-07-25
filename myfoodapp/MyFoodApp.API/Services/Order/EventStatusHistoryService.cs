using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class EventStatusHistoryService : IEventStatusHistoryService
    {
        private readonly IEventStatusHistoryRepository _eventStatusHistoryRepository;

        public EventStatusHistoryService(IEventStatusHistoryRepository eventStatusHistoryRepository)
        {
            _eventStatusHistoryRepository = eventStatusHistoryRepository;

        }
        
        public void Add(EventStatusHistory eventStatusHistory) => _eventStatusHistoryRepository.Create(eventStatusHistory);
        public void Update(EventStatusHistory eventStatusHistory) => _eventStatusHistoryRepository.Update(eventStatusHistory);
        public EventStatusHistory Get(long id) => _eventStatusHistoryRepository.GetByKey(id);
        public ICollection<EventStatusHistory> GetAll() => _eventStatusHistoryRepository.GetAll();
        public void Delete(long id) => _eventStatusHistoryRepository.DeleteByKey(id);

        public EventStatusHistory GetStatusHistoryByEventId(long id)
        {
            return _eventStatusHistoryRepository.GetStatusHistoryByEventId(id);
        }
    }
}
