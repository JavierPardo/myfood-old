using MyFoodApp.API.Enum;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Coupon
    {
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }
        public string Name { get; set; }
        public int DiscountType { get; set; }//Percent, Amount
        public int Type { get; set; } //Admin, Client
        public decimal MinAmount { get; set; }
        public decimal Amount { get; set; }
        public string Code { get; set; }
        public int ExpirationType { get; set; }//Fecha, Limit
        public DateTime? EndDate { get; set; }
        public int? Limit { get; set; }
        public bool IsActive { get; set; }
        [ForeignKey("Branch")]
        public int? BranchId { get; set; }
        [ForeignKey("Client")]
        public int? ClientId { get; set; }
        public virtual Client Client { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
}
