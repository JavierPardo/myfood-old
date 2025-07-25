using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ICategoryService
    {
        void Add(Category category);
        void Update(Category category);
        Category Get(long id);
        IEnumerable<Category> GetAll();
        IEnumerable<Category> GetByMenuId(long menuId);
        void Delete(long id);
        void UpdateSome(CategoryDto category, long id);
        void Rearrangement(Category[] category);
  }
}
