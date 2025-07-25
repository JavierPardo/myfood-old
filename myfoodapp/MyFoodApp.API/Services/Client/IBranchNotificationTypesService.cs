using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services.Client
{
    public interface IBranchNotificationTypesService
    {
        IEnumerable<BranchNotificationType> GetAll();
        void Create(BranchNotificationType branchNotification);
        void Update(BranchNotificationType branchNotification);
        void Delete(BranchNotificationType branchNotification);
    }
}
