using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IItemsSidesService
    {
        void Add(ItemsSides itemsSides);
        void Update(ItemsSides itemsSides);
        ItemsSides Get(long id);
        ICollection<ItemsSides> GetAll();
        void Delete(long id);
    }
}
