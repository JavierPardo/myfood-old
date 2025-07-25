using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ZoneService:IZoneService
    {
        private readonly IZoneRepository _zoneRepository;

        public ZoneService(IZoneRepository zoneRepository)
        {
            _zoneRepository = zoneRepository;
        }

        public void Add(Zone zone)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Zone> GetAll()
        {
            return _zoneRepository.GetAll();
        }

        public Zone GetById(int id)
        {
            return _zoneRepository.GetByKey(id);
        }

        public void Update(Zone zone)
        {
            throw new NotImplementedException();
        }
    }
}
