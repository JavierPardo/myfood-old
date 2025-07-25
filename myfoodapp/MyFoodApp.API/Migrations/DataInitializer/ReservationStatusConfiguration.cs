using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class ReserevationStatusConfiguration : IEntityTypeConfiguration<ReservationStatus>
    {
        public void Configure (EntityTypeBuilder<ReservationStatus> builder)
        {
            builder.ToTable("ReservationStatus");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new ReservationStatus
                {
                    Id = 1,
                    Name = "Por Confirmar"
                },
                new ReservationStatus
                {
                    Id = 2,
                    Name = "Rechazada por Pago"
                },
                new ReservationStatus
                {
                    Id = 3,
                    Name = "Rechazada"
                },
                new ReservationStatus
                {
                    Id = 4,
                    Name = "Confirmada"
                }
            );
        }
    }
}
