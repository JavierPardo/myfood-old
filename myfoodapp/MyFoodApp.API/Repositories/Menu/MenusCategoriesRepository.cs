using Microsoft.EntityFrameworkCore;
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
    public class MenusCategoriesRepository : EntityModelRepository<MenusCategories, long>, IMenusCategoriesRepository
    {
        public MenusCategoriesRepository(DataContext context, ILogger<MenusCategories> logger) : base(context, logger)
        {
        }

        public void ClearByCategoryId(long id)
        {
            var menuCategories = _dbSet.Where(x => x.CategoryId == id);
            foreach (var menuCategory in menuCategories)
            {
                _context.Entry(menuCategory).State = EntityState.Deleted;
            }
                _context.SaveChanges();
        }

        public IEnumerable<MenusCategories> GetAllByCategoryId(long categoryId)
        {
            return _dbSet.Where(x => x.CategoryId == categoryId);
        }

        public IEnumerable<MenusCategories> GetAllByMenuId(long menuId)
        {
            return _dbSet.Where(x => x.MenuId == menuId);
        }
    }
}