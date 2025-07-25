using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class OrderItemSelectedOptions
    {
        public long Id { get; set; }
        public long OrderItemId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual OrderItem OrderItem { get; set; }
        public long OptionId { get; set; }
        public string OptionChoice { get; set; }
        public virtual Option Option { get; set; }
    }
}
