using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ReservationStatusHistory
    {
        public long Id { get; set; }
        public long ReservationId { get; set; }
        public int StatusId { get; set; }
        public DateTime ChangeDateTime { get; set; }
        public long AdminUserId { get; set; }
        public virtual Reservation Reservation { get; set; }
    }
}
