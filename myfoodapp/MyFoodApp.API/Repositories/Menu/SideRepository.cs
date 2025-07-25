using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class SideRepository : EntityModelRepository<Side, long>, ISideRepository
    {
        public SideRepository(DataContext context, ILogger<Side> logger) : base(context, logger)
        {
        }

        public ICollection<Side> GetAllByBranch(int branchId)
        {
            return _dbSet.ToList();

        }

        public ICollection<Side> GetAllById(long[] ids)
        {
            return _dbSet.Where(x => ids.Contains(x.Id)).ToList();
        }

        public IEnumerable<Side> GetSidesByOrderId(long orderId)
        {
            return _dbSet.Where(s => s.OrderItemSelectedSides.Any(orderItemSide => orderItemSide.OrderItem.OrderId == orderId) ||
            s.OrderExtras.Any(orderExtra => orderExtra.OrderId == orderId)).ToList();
        }

        public ICollection<Side> GetAllById(ICollection<long> ids)
        {
            return _dbSet.Where(x => ids.Contains(x.Id)).ToList();
        }

        //public ICollection<Side> GetAllByItemBranch(int branchId, int itemId)
        //{
        //    return _dbSet.Where(x => x.ItemsSides.Any(i => i.ItemId == itemId && i.Item.CategoriesItems.Any(ci => ci.Category.MenusCategories.Any(mc => mc.Menu.BranchId == branchId)))).ToList();
        //}

        public IEnumerable<Side> GetAllByEventId(long eventId)
        {
            return _dbSet.Where(side => side.OrderExtras.Any(oe => oe.Order.EventId == eventId) || side.OrderItemSelectedSides.Any(oe => oe.OrderItem.Order.EventId == eventId));
        }
    }
}