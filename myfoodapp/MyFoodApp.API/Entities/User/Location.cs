using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Security.Policy;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Location
    {
        public long Id { get; set; }
        public string Coordinates { get; set; }
        public string Address { get; set; }
        public int? ZoneId { get; set; }//Para delivery no es necesario
        public int? CityId { get; set; }//Para delivery no es necesario
        public int? CountryId { get; set; }//Para delivery no es necesario
        public string IconIndex { get; set; }
        public string Notes { get; set; }
        public long UserId { get; set; }
        public virtual User User { get; set; }
        public virtual Zone Zone { get; set; }
        public virtual City City { get; set; }
        public virtual Country Country { get; set; }
        [JsonIgnore]
        public virtual ICollection<Event> Events { get; set; }

    }
    public class LocationEntityConfiguration : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            //Location - Event
            builder
               .HasMany(e => e.Events)
               .WithOne(e => e.DestinationLocation)
               .HasForeignKey(e => e.DestinationLocationId);
        }
    }
}
