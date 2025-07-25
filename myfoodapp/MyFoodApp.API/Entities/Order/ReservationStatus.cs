using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ReservationStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
    public class ReservationStatusEntityConfiguration : IEntityTypeConfiguration<ReservationStatus>
    {
        public void Configure(EntityTypeBuilder<ReservationStatus> builder)
        {
            builder
                .HasMany(e => e.Reservations)
                .WithOne(e => e.ReservationStatus)
                .HasForeignKey(e => e.CurrentStatusId);
        }
    }
}
