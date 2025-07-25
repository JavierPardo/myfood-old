using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class UserNotification
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public int NotificationTypeId { get; set; }
        public bool IsRead { get; set; }
        public long UserId { get; set; }
        public virtual User User { get; set; }
        public virtual UserNotificationType UserNotificationType { get; set; }
    }
}
