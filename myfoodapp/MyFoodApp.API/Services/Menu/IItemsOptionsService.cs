using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IItemsOptionsService
    {
        void Add(ItemsOptions itemsOptions);
        void Update(ItemsOptions itemsOptions);
        ItemsOptions Get(long id);
        ICollection<ItemsOptions> GetAll();
        void Delete(long id);
    }
}
