using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class UserNotificationRepository:EntityModelRepository<UserNotification, long>,IUserNotificationRepository
    {
        public UserNotificationRepository(DataContext dataContext, ILogger<UserNotification> logger):base(dataContext, logger)
        {

        }

        public IEnumerable<UserNotification> GetNotifcationsByUserId(long userId)
        {
            return _dbSet.Where(u => u.UserId == userId).ToList();
        }

        public void MarkAsReadById(IEnumerable<long> idList)
        {
            var notifications = _dbSet.Where(u => idList.Contains(u.Id)).ToList();
            notifications.ForEach(notification =>
            {
                notification.IsRead = true;
                Update(notification);
            });
        }
    }
}
