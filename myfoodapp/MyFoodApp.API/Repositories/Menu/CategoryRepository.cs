using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class CategoryRepository : EntityModelRepository<Category, long>, ICategoryRepository
    {
        readonly DataContext _dbcontext;
        public CategoryRepository(DataContext context, ILogger<Category> logger) : base(context, logger)
        {
            _dbcontext = context;
        }
        public IEnumerable<Category> GetByMenuId(long MenuId)
        {
            return _dbcontext.MenusCategories.Where(m => m.MenuId == MenuId).Select(m => m.Category);
        }

        public override ICollection<Category> GetAll()
        {
            return _dbSet.AsNoTracking().OrderBy(c => c.Position).ToList();
        }

        public int GetMaxPosition()
        {
            return _dbSet.OrderByDescending(x => x.Position).FirstOrDefault().Position;
        }
    }
}