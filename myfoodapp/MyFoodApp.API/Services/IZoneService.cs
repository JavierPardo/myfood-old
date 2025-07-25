using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IZoneService
    {
        IEnumerable<Zone> GetAll();
        Zone GetById(int id);
        void Add(Zone zone);
        void Delete(int id);
        void Update(Zone zone);
    }
}
