using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface ILocationService
    {
        void Add(Location location);
        void Update(Location location);
        Location Get(long id);
        ICollection<Location> GetAll();
        void Delete(long id);
        IEnumerable<Location> GetLocationsByUserId(long userId);
        object GetDeliveryDetails(string lat, string lng);
        IEnumerable<Location> GetByUserId();
    }
}
