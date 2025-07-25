using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Migrations.Configuration
{
    public class BranchNotificationTypeConfiguration : IEntityTypeConfiguration<BranchNotificationType>
    {
        public void Configure(EntityTypeBuilder<BranchNotificationType> builder)
        {
            builder.ToTable("BranchNotificationType");
            builder.Property(s => s.Name)
                .IsRequired(true);
            builder.HasData
            (
                new BranchNotificationType
                {
                    Id = 1,
                    Name = "Llamar Camarero"
                }
            );
        }
    }
}
