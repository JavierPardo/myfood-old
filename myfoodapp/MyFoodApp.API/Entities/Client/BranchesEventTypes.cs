using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchesEventTypes
    {
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int EventTypeId { get; set; }

        public virtual EventType EventType { get; set; }
    }

    public class BranchesEventTypesEntityConfiguration : IEntityTypeConfiguration<BranchesEventTypes>
    {
        public void Configure(EntityTypeBuilder<BranchesEventTypes> builder)
        {
            //many-to-many
            builder
                 .HasKey(e => new { e.BranchId, e.EventTypeId });
            builder
               .HasOne(e => e.Branch)
               .WithMany(e => e.BranchesEventTypes)
               .HasForeignKey(e => e.BranchId);
            builder
               .HasOne(e => e.EventType)
               .WithMany(e => e.BranchesEventTypes)
               .HasForeignKey(e => e.EventTypeId);
        }
    }
}
