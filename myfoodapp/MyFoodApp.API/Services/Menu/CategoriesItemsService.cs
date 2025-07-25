using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class CategoriesItemsService : ICategoriesItemsService
    {
        private readonly ICategoriesItemsRepository _categoriesItemsRepository;

        public CategoriesItemsService(ICategoriesItemsRepository categoriesItemsRepository)
        {
            _categoriesItemsRepository = categoriesItemsRepository;
        }
        public void Add(CategoriesItems client) => _categoriesItemsRepository.Create(client);

        public void Delete(long id) => _categoriesItemsRepository.DeleteByKey(id);

        public CategoriesItems Get(long id) => _categoriesItemsRepository.GetByKey(id);

        public ICollection<CategoriesItems> GetAll() => _categoriesItemsRepository.GetAll();

        public void Update(CategoriesItems client) => _categoriesItemsRepository.Update(client);
    }
}
