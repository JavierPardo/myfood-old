using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchLogisticProvider
    {
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public int LogisticProviderId { get; set; }
        public virtual LogisticProvider LogisticProvider { get; set; }
        public bool IsBranchDefault { get; set; }
    }

    public class BranchLogisticProviderEntityConfiguration : IEntityTypeConfiguration<BranchLogisticProvider>
    {
        public void Configure(EntityTypeBuilder<BranchLogisticProvider> builder)
        {
            //many-to-many
            builder
                .HasKey(e => new { e.BranchId, e.LogisticProviderId });
            builder
               .HasOne(e => e.Branch)
               .WithMany(e => e.BranchLogisticProviders)
               .HasForeignKey(e => e.BranchId);
            builder
                .HasOne(e => e.LogisticProvider)
               .WithMany(e => e.BranchLogisticProviders)
               .HasForeignKey(e => e.LogisticProviderId);
        }
    }
}
