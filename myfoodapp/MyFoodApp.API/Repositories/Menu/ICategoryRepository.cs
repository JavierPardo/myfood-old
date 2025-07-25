using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ICategoryRepository:IEntityModelRepository<Category, long>
    {
        IEnumerable<Category> GetByMenuId(long MenuId);
        int GetMaxPosition();
    }    
}
