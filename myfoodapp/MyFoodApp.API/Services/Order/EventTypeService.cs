using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class EventTypeService : IEventTypeService
    {
        private readonly IEventTypeRepository _eventTypeRepository;

        public EventTypeService(IEventTypeRepository eventTypeRepository)
        {
            _eventTypeRepository = eventTypeRepository;

        }
        
        public void Add(EventType eventType) => _eventTypeRepository.Create(eventType);
        public void Update(EventType eventType) => _eventTypeRepository.Update(eventType);
        public EventType Get(int id) => _eventTypeRepository.GetByKey(id);
        public ICollection<EventType> GetAll() => _eventTypeRepository.GetAll();
        public void Delete(int id) => _eventTypeRepository.DeleteByKey(id);
    }
}
