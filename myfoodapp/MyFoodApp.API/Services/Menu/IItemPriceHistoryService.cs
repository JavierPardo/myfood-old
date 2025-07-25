using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IItemPriceHistoryService
    {
        void Add(ItemPriceHistory itemPriceHistory);
        void Update(ItemPriceHistory itemPriceHistory);
        ItemPriceHistory Get(long id);
        ICollection<ItemPriceHistory> GetAll();
        void Delete(long id);
        ItemPriceHistory GetPriceHistoryByItemId(long id);
    }
}
