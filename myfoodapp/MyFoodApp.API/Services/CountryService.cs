using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class CountryService : ICountryService
    {
        private readonly ICountryRepository _countryRepository;

        public CountryService(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }
        public void Add(Country client) => _countryRepository.Create(client);

        public void Delete(int id) => _countryRepository.DeleteByKey(id);

        public Country Get(int id) => _countryRepository.GetByKey(id);

        public ICollection<Country> GetAll() => _countryRepository.GetAll();

        public void Update(Country client) => _countryRepository.Update(client);
    }
}
