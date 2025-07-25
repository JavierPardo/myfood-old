using MyFoodApp.API.Entities;
using MyFoodApp.API.Repositories.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services.Client
{
    public class BranchNotificationService : IBranchNotificationService
    {
        private readonly IBranchNotificationsRepository _branchNotificationsRepository;

        public BranchNotificationService(IBranchNotificationsRepository branchNotificationsRepository)
        {
            _branchNotificationsRepository = branchNotificationsRepository;
        }

        public void Create(BranchNotification branchNotification)
        {
            throw new NotImplementedException();
        }

        public void Delete(BranchNotification branchNotification)
        {
            throw new NotImplementedException();
        }

        public ICollection<BranchNotification> GetUnseen()
        {
            return _branchNotificationsRepository.GetUnseen().Result;
        }

        public void MarkAsSeen(int id)
        {
            _branchNotificationsRepository.MarkAsSeen(id);
        }

        public void Update(BranchNotification branchNotification)
        {
            throw new NotImplementedException();
        }
    }
}
