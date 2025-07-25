using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class PaymentType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
        public string Password { get; set; }
        public string URL { get; set; }
        [NotMapped]
        public string Logo { get; set; }
        public int? PaymentProviderId { get; set; }
        public virtual PaymentProvider PaymentProvider { get; set; }
        public virtual ICollection<BranchesPaymentTypes> BranchesPaymentTypes { get; set; }
        public virtual ICollection<ClientTransaction> Transactions { get; set; }
        public decimal ProcessingPercentageFee { get; set; }
    }
    public class PaymentTypeEntityConfiguration : IEntityTypeConfiguration<PaymentType>
    {
        public void Configure(EntityTypeBuilder<PaymentType> builder)
        {
            builder
               .HasMany(e => e.Transactions)
               .WithOne(e => e.PaymentType)
               .HasForeignKey(e => e.PaymentTypeId);
        }
    }
}
