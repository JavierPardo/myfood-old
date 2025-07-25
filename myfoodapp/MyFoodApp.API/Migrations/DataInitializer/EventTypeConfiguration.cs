using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class EventTypeConfiguration : IEntityTypeConfiguration<EventType>
    {
        public void Configure(EntityTypeBuilder<EventType> builder)
        {
            builder.ToTable("EventType");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new EventType
                {
                    Id = 1,
                    Name = "Pedido Pickup"
                },
                new EventType
                {
                    Id = 2,
                    Name = "Pedido Delivery"
                },
                 new EventType
                 {
                     Id = 3,
                     Name = "Camarero Virtual"
                 },
                 new EventType
                 {
                    Id = 4,
                    Name = "Reserva"  //una reserva puede que no tenga un evento asociado. Pero esta opción está aquí para denotar branches que ofrezcan estos servicios
                 }
            );
        }
    }
}
