using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Side
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal, string>))]
        public decimal CurrentPrice { get; set; }
        public bool IsActive { get; set; }
        [NotMapped]
        public string Image { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<OrderExtra> OrderExtras { get; set; }
        public virtual ICollection<SidePriceHistory> SidePriceHistories { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<OrderItemSelectedSides> OrderItemSelectedSides { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
    }
    public class SideEntityConfiguration : IEntityTypeConfiguration<Side>
    {
        public void Configure(EntityTypeBuilder<Side> builder)
        {
            builder
               .HasMany(e => e.SidePriceHistories)
               .WithOne(e => e.Side)
               .HasForeignKey(e => e.SideId);
        }
    }
}
