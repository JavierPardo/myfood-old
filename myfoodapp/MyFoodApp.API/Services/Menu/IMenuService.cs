using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IMenuService
    {
        void Add(Menu menu);
        void Update(Menu menu);
        Menu Get(long id);
        ICollection<Menu> GetAll();
        void Delete(long id);
        IEnumerable<Menu> GetMenuByBranchId(int branchId);
        void UpdateSome(MenuPatchDto menu, long id);
    }
}
