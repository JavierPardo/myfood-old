using MyFoodApp.API.Entities;
using MyFoodApp.API.Repositories.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services.Client
{
    public class BranchNotificationTypesService : IBranchNotificationTypesService
    {
        private readonly IBranchNotificationTypesRepository _branchNotificationTypesRepository;

        public BranchNotificationTypesService(IBranchNotificationTypesRepository branchNotificationTypesRepository)
        {
            _branchNotificationTypesRepository = branchNotificationTypesRepository;
        }

        public void Create(BranchNotificationType branchNotification)
        {
            throw new NotImplementedException();
        }

        public void Delete(BranchNotificationType branchNotification)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<BranchNotificationType> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(BranchNotificationType branchNotification)
        {
            throw new NotImplementedException();
        }
    }
}
