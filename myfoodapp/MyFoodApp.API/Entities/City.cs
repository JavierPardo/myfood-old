using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<PaymentProvider> PaymentProviders { get; set; }
        public virtual ICollection<Zone> Zones { get; set; }
    }

    public class CityEntityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder
               .HasMany(e => e.Locations)
               .WithOne(e => e.City)
               .HasForeignKey(e => e.CityId);
            builder
              .HasMany(e => e.Zones)
              .WithOne(e => e.City)
              .HasForeignKey(e => e.CityId);
        }
    }
}
