using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Country
    {
        public int Id { get; set; }
        public string CountryName { get; set; }
        public string CountryPhoneCode { get; set; }
        public virtual ICollection<City> Cities { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<PaymentProvider> PaymentProviders { get; set; }
    }

    public class CountryEntityConfiguration : IEntityTypeConfiguration<Country>
    {
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder
               .HasMany(e => e.Locations)
               .WithOne(e => e.Country)
               .HasForeignKey(e => e.CountryId);
            builder
              .HasMany(e => e.Cities)
              .WithOne(e => e.Country)
              .HasForeignKey(e => e.CountryId);
        }
    }
}
