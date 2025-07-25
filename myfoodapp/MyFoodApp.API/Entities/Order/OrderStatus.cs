using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class OrderStatus
    {
        public OrderStatus()
        {
            Billable = true;
        }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Billable { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Order> Orders { get; set; }
    }
    public class OrderStatusEntityConfiguration : IEntityTypeConfiguration<OrderStatus>
    {
        public void Configure(EntityTypeBuilder<OrderStatus> builder)
        {
            builder
               .HasMany(e => e.Orders)
               .WithOne(e => e.OrderStatus)
               .HasForeignKey(e => e.CurrentStatusId);
        }
    }
}
