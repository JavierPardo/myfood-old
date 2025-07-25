using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ItemPriceHistory
    {
        public long Id { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public long ItemId { get; set; }
        public long AdminUserId { get; set; }
        public virtual Item Item { get; set; }
        public virtual User AdminUser { get; set; }
    }
   
}
