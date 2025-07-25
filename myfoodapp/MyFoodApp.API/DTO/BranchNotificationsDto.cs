using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class BranchNotificationsDto
    {
        public long Id { get; set; }
        public int BranchNotificationTypeId { get; set; }
        public string BranchNotificationTypeName { get; set; }
        public string Notes { get; set; }
        public DateTime SentDateTime { get; set; }
        public bool Read { get; set; }
        public string EventTableNumber { get; set; }
    }
}
