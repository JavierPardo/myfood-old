using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories.Order
{
    public class BranchNotificationsRepository : EntityModelRepository<BranchNotification, long>, IBranchNotificationsRepository
    {
        public BranchNotificationsRepository(DataContext context, ILogger<BranchNotification> logger) : base(context, logger)
        {
        }

        public void Delete(BranchNotification branchNotification)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<BranchNotification>> GetUnseen()
        {
            ICollection<BranchNotification> notifications = await _dbSet
                .Include(bn => bn.BranchNotificationType)
                .Include(bn => bn.Event)
                .Where(bn => !(bn.Read)).ToListAsync();
            return notifications;
        }

        public void MarkAsSeen(int id)
        {
            BranchNotification branchNotification = _dbSet.Where(bn => bn.Id == id).First();
            branchNotification.Read = true;
            _dbSet.Update(branchNotification);
            _context.SaveChanges();
        }
    }
}
