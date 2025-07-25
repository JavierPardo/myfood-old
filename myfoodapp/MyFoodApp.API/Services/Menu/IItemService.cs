using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IItemService
    {
        void Add(Item item);
        void Update(Item item);
        Item Get(long id);
        IEnumerable<Item> GetAll();
        void Delete(long id);
        IEnumerable<Item> GetFilteredItems(long menu, long category, string query);
        IEnumerable<Item> GetItemsByIds(long[] ids);
        void UpdateSome(ItemDto itemDTO, long id);
        IEnumerable<Item> GetItemsByBranchId(int branchId);
        IEnumerable<Item> GetItemsByMenuId(long menuId);
        IEnumerable<Item> GetItemsByCategoryId(long categoryId);
        Item GetWithRelations(long id);
        IEnumerable<Item> GetItemsByOrderId(long orderId);
        IEnumerable<Item> GetItemsByEventId(long v);
        void Rearrange(Item[] item);
  }
}
