using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IMenusCategoriesRepository : IEntityModelRepository<MenusCategories, long>
    {
        IEnumerable<MenusCategories> GetAllByMenuId(long menuId);
        IEnumerable<MenusCategories> GetAllByCategoryId(long categoryId);
        void ClearByCategoryId(long id);
    }
}
