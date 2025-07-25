using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserNotificationService
    {
        void Add(UserNotification client);
        void Update(UserNotification client);
        UserNotification Get(long id);
        ICollection<UserNotification> GetAll();
        void Delete(long id);
        void MarkRead(IEnumerable<long> idList);
        IEnumerable<UserNotification> GetNotifcationsByCurrentUserId();
    }
}
