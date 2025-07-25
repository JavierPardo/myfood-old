using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class EventStatusHistory
    {
        public long Id { get; set; }
        public long EventId { get; set; }
        public int StatusId { get; set; }
        public DateTime ChangeDateTime { get; set; }
        public long AdminUserId { get; set; }
        public virtual Event Event { get; set; }
    }
}
