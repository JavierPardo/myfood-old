using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
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
    public class OrderItem
    {
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }
        [ForeignKey("Order")]
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long OrderId { get; set; }
        public long ItemId { get; set; }
        public int Quantity { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal,string>))]
        public decimal Price { get; set; }
        public string Notes { get; set; }
        public virtual Item Item { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Order Order { get; set; }
        public virtual ICollection<OrderItemSelectedSides> SelectedSides { get; set; }
        public virtual ICollection<OrderItemSelectedOptions> SelectedOptions { get; set; }
    }
    public class OrderItemEntityConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            //OrderItem - OrderItemSelectedSides
            builder
               .HasMany(e => e.SelectedSides)
               .WithOne(e => e.OrderItem)
               .HasForeignKey(e => e.OrderItemId);
            //OrderItem - OrderItemSelectedOptions
            builder
               .HasMany(e => e.SelectedOptions)
               .WithOne(e => e.OrderItem)
               .HasForeignKey(e => e.OrderItemId);
        }
    }
}
