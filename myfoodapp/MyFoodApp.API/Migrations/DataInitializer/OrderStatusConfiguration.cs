using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class OrderStatusConfiguration : IEntityTypeConfiguration<OrderStatus>
    {
        public void Configure (EntityTypeBuilder<OrderStatus> builder)
        {
            builder.ToTable("OrderStatus");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new OrderStatus
                {
                    Id = 1,
                    Name = "Por Confirmar"
                },
                new OrderStatus
                {
                    Id = 2,
                    Name = "En Proceso"
                },
                new OrderStatus
                {
                    Id = 3,
                    Name = "Rechazado"
                },
                new OrderStatus
                {
                    Id = 4,
                    Name = "Listo para Despacho"
                },
                new OrderStatus
                {
                    Id = 5,
                    Name = "Despachado"
                },
                 new OrderStatus
                 {
                     Id = 6,
                     Name = "Recibido"
                 },
                new OrderStatus
                {
                    Id = 7,
                    Name = "Rechazado por Pago"
                }
            );
        }
    }
}
