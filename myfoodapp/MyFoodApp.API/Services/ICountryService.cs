using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ICountryService
    {
        void Add(Country country);
        void Update(Country country);
        Country Get(int id);
        ICollection<Country> GetAll();
        void Delete(int id);
    }
}
