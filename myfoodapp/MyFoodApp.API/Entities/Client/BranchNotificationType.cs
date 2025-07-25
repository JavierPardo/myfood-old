using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchNotificationType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<BranchNotification> BranchNotifications { get; set; }
    }
}
