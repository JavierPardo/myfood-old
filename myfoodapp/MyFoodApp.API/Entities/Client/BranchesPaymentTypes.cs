using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchesPaymentTypes
    {
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }

        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int PaymentTypeId { get; set; }
        public virtual PaymentType PaymentType { get; set; }
    }

    public class BranchesPaymentTypesEntityConfiguration : IEntityTypeConfiguration<BranchesPaymentTypes>
    {
        public void Configure(EntityTypeBuilder<BranchesPaymentTypes> builder)
        {
            builder
              .HasKey(e => new { e.BranchId, e.PaymentTypeId });
            builder
               .HasOne(e => e.Branch)
               .WithMany(e => e.BranchesPaymentTypes)
               .HasForeignKey(e => e.BranchId);
            builder
               .HasOne(e => e.PaymentType)
               .WithMany(e => e.BranchesPaymentTypes)
               .HasForeignKey(e => e.PaymentTypeId);
        }
    }
}
