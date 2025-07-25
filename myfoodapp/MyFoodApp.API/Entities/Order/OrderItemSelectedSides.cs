using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class OrderItemSelectedSides
    {
        public long Id { get; set; }
        public long ItemId { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long OrderItemId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual OrderItem OrderItem { get; set; }
        public long SideId { get; set; }
        public virtual Side Side { get; set; }
        public decimal Price { get; internal set; }
    }
}
