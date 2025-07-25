using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Zone
    {
        public int Id { get; set; }
        public string ZoneName { get; set; }
        public string Coordinates { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }

    }

    public class ZoneEntityConfiguration : IEntityTypeConfiguration<Zone>
    {
        public void Configure(EntityTypeBuilder<Zone> builder)
        {
            builder
               .HasMany(e => e.Locations)
               .WithOne(e => e.Zone)
               .HasForeignKey(e => e.ZoneId);
            builder
              .HasMany(e => e.Branches)
              .WithOne(e => e.Zone)
              .HasForeignKey(e => e.ZoneId);
        }
    }
}
