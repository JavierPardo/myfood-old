using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;

        public FavoriteService(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }
        public void Add(Favorite favorite) => _favoriteRepository.Create(favorite);

        public void Delete(long id) => _favoriteRepository.DeleteByKey(id);

        public Favorite Get(long id) => _favoriteRepository.GetByKey(id);

        public ICollection<Favorite> GetAll() => _favoriteRepository.GetAll();

        public IEnumerable<Favorite> GetFavoritesByUserId(long userId)
        {
            return _favoriteRepository.GetFavoritesByUserId(userId);
        }

        public void Update(Favorite favorite) => _favoriteRepository.Update(favorite);
    }
}
