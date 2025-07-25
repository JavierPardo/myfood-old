using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories.Order
{
    public class BranchNotificationTypesRepository : EntityModelRepository<BranchNotificationType, int>, IBranchNotificationTypesRepository
    {
        public BranchNotificationTypesRepository(DataContext context, ILogger<BranchNotificationType> logger) : base(context, logger)
        {
        }
        public void Delete(BranchNotificationType branchNotification)
        {
            throw new NotImplementedException();
        }
    }
}
