using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services.Client
{
    public interface IBranchNotificationService
    {
        ICollection<BranchNotification> GetUnseen();
        void MarkAsSeen(int id);
        void Create(BranchNotification branchNotification);
        void Update(BranchNotification branchNotification);
        void Delete(BranchNotification branchNotification);
    }
}
