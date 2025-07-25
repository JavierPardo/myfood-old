using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Order
    {
        [Key]
        [JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }
        public DateTime CreateOrderDateTime { get; set; }
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int CurrentStatusId { get; set; }
        public DateTime ScheduledOrderReady { get; set; }
        public string ClientOrderId { get; set; } //identificador interno de pedido en el cliente. 
        [JsonConverter(typeof(JsonObjectConverter<long,string>))]
        public long EventId { get; set; }
        public string Notes { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Event Event { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }
        public virtual ICollection<OrderStatusHistory> OrderStatusHistories { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<OrderExtra> OrderExtras { get; set; }
    }
    public class OrderEntityConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder
               .HasMany(e => e.OrderItems)
               .WithOne(e => e.Order)
               .HasForeignKey(e => e.OrderId);
            builder
               .HasMany(e => e.OrderStatusHistories)
               .WithOne(e => e.Order)
               .HasForeignKey(e => e.OrderId);
        }
    }
}
