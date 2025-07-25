using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class EventType
    {
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Deliverable { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Event> Events { get; set; }
        [JsonIgnore]
        public virtual ICollection<BranchesEventTypes> BranchesEventTypes { get; set; }
    }
    public class EventTypeEntityConfiguration : IEntityTypeConfiguration<EventType>
    {
        public void Configure(EntityTypeBuilder<EventType> builder)
        {
            //EventType - Event
            builder
               .HasMany(e => e.Events)
               .WithOne(e => e.EventType)
               .HasForeignKey(e => e.TypeId);
        }
    }
}
