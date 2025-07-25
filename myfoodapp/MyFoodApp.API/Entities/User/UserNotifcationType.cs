using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class UserNotificationType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public int UserNotificationId { get; set; }

        public virtual ICollection<UserNotification> UserNotifications { get; set; }
    }
}
