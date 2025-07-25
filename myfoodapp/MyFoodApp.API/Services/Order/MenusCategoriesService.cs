using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class MenusCategoriesService : IMenusCategoriesService
    {
        private readonly IMenusCategoriesRepository _menusCategoriesRepository;

        public MenusCategoriesService(IMenusCategoriesRepository menusCategoriesRepository)
        {
            _menusCategoriesRepository = menusCategoriesRepository;
        }
        public void Add(MenusCategories client) => _menusCategoriesRepository.Create(client);

        public void Delete(long id) => _menusCategoriesRepository.DeleteByKey(id);

        public MenusCategories Get(long id) => _menusCategoriesRepository.GetByKey(id);

        public ICollection<MenusCategories> GetAll() => _menusCategoriesRepository.GetAll();

        public IEnumerable<MenusCategories> GetAllByCategoryId(long categoryId)
        {
            return _menusCategoriesRepository.GetAllByCategoryId(categoryId);
        }

        public IEnumerable<MenusCategories> GetAllByMenuId(long menuId)
        {
            return _menusCategoriesRepository.GetAllByMenuId(menuId);
        }

        public void Update(MenusCategories client) => _menusCategoriesRepository.Update(client);
    }
}
