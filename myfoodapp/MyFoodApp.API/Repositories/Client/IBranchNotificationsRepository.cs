using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories.Order
{
    public interface IBranchNotificationsRepository : IEntityModelRepository<BranchNotification, long>
    {
        Task<ICollection<BranchNotification>> GetUnseen();
        void Delete(BranchNotification branchNotificationType);
        void MarkAsSeen(int id);
    }
}
