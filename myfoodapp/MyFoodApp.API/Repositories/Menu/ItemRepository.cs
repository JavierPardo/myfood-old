using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class ItemRepository : EntityModelRepository<Item, long>, IItemRepository
    {

        public ItemRepository(DataContext context, ILogger<Item> logger) : base(context, logger)
        {
        }

        public ICollection<Item> GetAllByEventId(long eventId)
        {
            return _dbSet.Where(item => item.OrderItems.Any(orderItem => orderItem.Order.EventId == eventId)).ToList();
        }

        public ICollection<Item> GetAllById(long[] ids)
        {
            return _dbSet
                .Where(x => ids.Contains(x.Id)).ToList();
        }

        public IEnumerable<Item> GetAllByOrderId(long orderId)
        {
            return _dbSet.Where(item => item.OrderItems.Any(oi => oi.OrderId == orderId));
        }

        public ICollection<Item> GetByMenuAndCategoryAndQuery(long menu, long category, string query)
        {
            var querySql = _dbSet.AsQueryable<Item>();
            if (menu != 0)
            {
                querySql = querySql.Where(x =>
             x.CategoriesItems.Any(ci =>
             ci.Category.MenusCategories.Any(mc => mc.MenuId == menu))
                );
            }
            if (category != 0)
            {
                querySql = querySql.Where(x =>
            x.CategoriesItems.Any(ci =>
                (category == 0 || ci.CategoryId == category)
                ));
            }
            if (!string.IsNullOrWhiteSpace(query))
            {
                querySql = querySql.Where(x =>
                x.Description.Contains(query) || x.Name.Contains(query) ||
                x.CategoriesItems.Any(ci => ci.Category.Name.Contains(query) ||
                ci.Category.MenusCategories.Any(m => m.Menu.Name.Contains(query)))
                );
            }
            return querySql.ToList();
        }

        public IEnumerable<Item> GetItemsByBranchId(int branchId)
        {
            return _dbSet.Where(i => i.BranchId == branchId);
        }

        public IEnumerable<Item> GetItemsByCategoryId(long categoryId)
        {
            return _dbSet.Where(i => i.CategoriesItems.Any(ci => ci.CategoryId == categoryId));
        }

        public IEnumerable<Item> GetItemsByMenuId(long menuId)
        {
            return _dbSet.Where(i =>
                i.CategoriesItems.Any(ci =>
                    ci.Category.MenusCategories.Any(mc =>
                        mc.MenuId == menuId)));
        }

        public override ICollection<Item> GetAll()
        {
            return _dbSet.AsNoTracking().OrderBy(i => i.Position).ToList();
        }

        public void UpdatePosition(Item[] items)
        {
            long[] itemsIds = items.Select(i => i.Id).ToArray();
            var itemPositionDic = items.ToDictionary(i => i.Id, i => i.Position);
            var dbItems = _dbSet.Where(i => itemsIds.Contains(i.Id)).ToList();
            dbItems.ForEach(i => i.Position = itemPositionDic.GetValueOrDefault(i.Id));
            _dbSet.UpdateRange(dbItems);
            _context.SaveChanges();
        }
    }
}