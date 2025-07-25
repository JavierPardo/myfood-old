using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class TransactionStatusHistory
    {
        public long Id { get; set; }
        public long TransactionId { get; set; }
        public int StatusId { get; set; }
        public DateTime ChangeDateTime { get; set; }
        public long AdminUserId { get; set; }
        public virtual ClientTransaction Transaction { get; set; }
    }

}
