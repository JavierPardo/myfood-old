using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class TransactionStatusConfiguration : IEntityTypeConfiguration<TransactionStatus>
    {
        public void Configure (EntityTypeBuilder<TransactionStatus> builder)
        {
            builder.ToTable("TransactionStatus");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new TransactionStatus
                {
                    Id = 1,
                    Name = "Autorizada"
                },
                new TransactionStatus
                {
                    Id = 2,
                    Name = "Pago Procesado"
                },
                new TransactionStatus
                {
                    Id = 3,
                    Name = "Autorización Cancelada"
                },
                new TransactionStatus
                {
                    Id = 4,
                    Name = "Autorización Rechazada"
                },
                new TransactionStatus
                {
                    Id = 5,
                    Name = "Pendiente Efectivo"
                },
                new TransactionStatus
                {
                    Id = 6,
                    Name = "Conciliada"
                }
            );
        }
    }
}
