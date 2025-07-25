using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories.Order
{
    public interface IBranchNotificationTypesRepository : IEntityModelRepository<BranchNotificationType, int>
    {
        void Delete(BranchNotificationType branchNotification);
    }
}
