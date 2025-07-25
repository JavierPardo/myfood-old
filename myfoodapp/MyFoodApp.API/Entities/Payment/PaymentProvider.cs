using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class PaymentProvider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public virtual ICollection<PaymentType> PaymentTypes { get; set; }
    }
    public class PaymentProviderEntityConfiguration : IEntityTypeConfiguration<PaymentProvider>
    {
        public void Configure(EntityTypeBuilder<PaymentProvider> builder)
        {
            builder
               .HasMany(e => e.PaymentTypes)
               .WithOne(e => e.PaymentProvider)
               .HasForeignKey(e => e.PaymentProviderId);
        }
    }
}
