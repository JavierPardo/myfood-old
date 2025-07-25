using MyFoodApp.API.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IMenusCategoriesService
    {
        void Add(MenusCategories menusCategories);
        void Update(MenusCategories menusCategories);
        MenusCategories Get(long id);
        ICollection<MenusCategories> GetAll();
        void Delete(long id);
        IEnumerable<MenusCategories> GetAllByMenuId(long menuId);
        IEnumerable<MenusCategories> GetAllByCategoryId(long categoryId);
    }
}
