using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ReservationSpecialEvent
    {
        public long Id { get; set; }
        public int BranchId{ get; set; }
        public virtual Branch Branch { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [NotMapped]
        public string Image { get; set; }
        public decimal CurrentPrice { get; set; }
        public bool Prepaid { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public virtual IEnumerable<Reservation> Reservations { get; set; }
    }
    public class ReservationSpecialEventEntityConfiguration : IEntityTypeConfiguration<ReservationSpecialEvent>
    {
        public void Configure(EntityTypeBuilder<ReservationSpecialEvent> builder)
        {
            //ReservationSpecialEvent - Reservation
            builder
                .HasMany(e => e.Reservations)
                .WithOne(e => e.SpecialEvent)
                .HasForeignKey(e => e.SpecialEventId);
        }
    }
}
