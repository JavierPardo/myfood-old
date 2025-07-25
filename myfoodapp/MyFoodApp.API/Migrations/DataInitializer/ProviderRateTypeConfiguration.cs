using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class LogisticProviderRateTypeConfiguration : IEntityTypeConfiguration<LogisticProviderRateType>
    {
        public void Configure (EntityTypeBuilder<LogisticProviderRateType> builder)
        {
            builder.ToTable("LogisticProviderRateTypes");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new LogisticProviderRateType
                {
                    Id = 1,
                    Name = "Por Distancia"
                },
                new LogisticProviderRateType
                {
                    Id = 2,
                    Name = "Tarifa Fija"
                }
            );
        }
    }
}
