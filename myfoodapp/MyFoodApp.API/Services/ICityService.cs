using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ICityService
    {
        void Add(City city);
        void Update(City city);
        City Get(int id);
        ICollection<City> GetAll();
        void Delete(int id);
    }
}
