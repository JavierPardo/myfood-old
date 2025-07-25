using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IItemRepository : IEntityModelRepository<Item, long>
    {
        ICollection<Item> GetByMenuAndCategoryAndQuery(long menu, long category, string query);
        ICollection<Item> GetAllById(long[] ids);
        IEnumerable<Item> GetItemsByBranchId(int branchId);
        IEnumerable<Item> GetItemsByMenuId(long menuId);
        IEnumerable<Item> GetItemsByCategoryId(long categoryId);
        IEnumerable<Item> GetAllByOrderId(long orderId);
        ICollection<Item> GetAllByEventId(long eventId);
        void UpdatePosition(Item[] items);
    }
}
