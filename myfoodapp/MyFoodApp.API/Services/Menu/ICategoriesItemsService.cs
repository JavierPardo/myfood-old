using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ICategoriesItemsService
    {
        void Add(CategoriesItems categoriesItems);
        void Update(CategoriesItems categoriesItems);
        CategoriesItems Get(long id);
        ICollection<CategoriesItems> GetAll();
        void Delete(long id);
    }
}
