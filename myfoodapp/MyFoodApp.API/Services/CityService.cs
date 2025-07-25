using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class CityService : ICityService
    {
        private readonly ICityRepository _cityRepository;

        public CityService(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }
        public void Add(City client) => _cityRepository.Create(client);

        public void Delete(int id) => _cityRepository.DeleteByKey(id);

        public City Get(int id) => _cityRepository.GetByKey(id);

        public ICollection<City> GetAll() => _cityRepository.GetAll();

        public void Update(City client) => _cityRepository.Update(client);
    }
}
