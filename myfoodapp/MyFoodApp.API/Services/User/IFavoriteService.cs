using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IFavoriteService
    {
        void Add(Favorite client);
        void Update(Favorite client);
        Favorite Get(long id);
        ICollection<Favorite> GetAll();
        void Delete(long id);
        IEnumerable<Favorite> GetFavoritesByUserId(long userId);
    }
}
