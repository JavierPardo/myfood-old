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
    public class OrderExtra
    {
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }

        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long OrderId { get; set; }

        public long SideId { get; set; }
        public int Quantity { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal, string>))]
        public decimal Price { get; set; }
        public virtual Side Side { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Order Order { get; set; }
    }
}
