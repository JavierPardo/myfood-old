using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class EventStatusService : IEventStatusService
    {
        private readonly IEventStatusRepository _eventStatusRepository;

        public EventStatusService(IEventStatusRepository eventStatusRepository)
        {
            _eventStatusRepository = eventStatusRepository;

        }
        
        public void Add(EventStatus eventStatus) => _eventStatusRepository.Create(eventStatus);
        public void Update(EventStatus eventStatus) => _eventStatusRepository.Update(eventStatus);
        public EventStatus Get(int id) => _eventStatusRepository.GetByKey(id);
        public ICollection<EventStatus> GetAll() => _eventStatusRepository.GetAll();
        public void Delete(int id) => _eventStatusRepository.DeleteByKey(id);
    }
}
