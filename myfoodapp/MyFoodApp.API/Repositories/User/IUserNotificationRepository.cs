using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserNotificationRepository : IEntityModelRepository<UserNotification, long>
    {
        IEnumerable<UserNotification> GetNotifcationsByUserId(long userId);
        void MarkAsReadById(IEnumerable<long> idList);
    }
}
