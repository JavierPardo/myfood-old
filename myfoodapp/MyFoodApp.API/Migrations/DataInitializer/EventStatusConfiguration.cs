using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class EventStatusConfiguration : IEntityTypeConfiguration<EventStatus>
    {
        public void Configure(EntityTypeBuilder<EventStatus> builder)
        {
            builder.ToTable("EventStatus");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new EventStatus
                {
                    Id = 1,
                    Name = "Abierto"
                },
                new EventStatus
                {
                    Id = 2,
                    Name = "Cerrado"
                }
            );
        }
    }
}
