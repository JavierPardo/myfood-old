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
    public class EventStatus
    {
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
    public class EventStatusEntityConfiguration : IEntityTypeConfiguration<EventStatus>
    {
        public void Configure(EntityTypeBuilder<EventStatus> builder)
        {
            builder
               .HasMany(e => e.Events)
               .WithOne(e => e.EventStatus)
               .HasForeignKey(e => e.CurrentStatusId);
        }
    }
}
