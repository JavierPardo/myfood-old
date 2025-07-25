using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace MyFoodApp.API.Entities
{
    /// <summary>
    /// Reservation entity
    /// </summary>
    public class Reservation
    {
        public long Id { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public long UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime ReservationDateTime { get; set; }
        public DateTime RequestedDateTime { get; set; }  //fecha 
        public int NumberOfGuests { get; set; }
        public long? SpecialEventId { get; set; }  //puede o no estar asociado a un evento especial con fecha y hora determinadas
        public int CurrentStatusId { get; set; }
        public long? EventId { get; set; }  //puede o no estar asociado a un evento (Ej. se hace un pedido de camarero virtual asociado con la reserva)
        public virtual Event Event { get; set; }
        public virtual ReservationSpecialEvent SpecialEvent { get; set; }
        public virtual ReservationStatus ReservationStatus { get; set; }
        public virtual ICollection<ReservationStatusHistory> ReservationStatusHistories { get; set; }
        public virtual ICollection<ClientTransaction> Transactions { get; set; }
        public string Notes { get; set; }        
    }
    public class ReservationEntityConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            //Reservation - Event
            builder
                .HasOne(e => e.Event)
                .WithOne(e => e.Reservation)
                .HasForeignKey<Reservation>(e => e.EventId);
            //Reservation - ClientTransactions
            builder
              .HasMany(e => e.Transactions)
              .WithOne(e => e.Reservation)
              .HasForeignKey(e => e.ReservationId);
            //Reservation - ReservationStatusHistory
            builder
                .HasMany(e => e.ReservationStatusHistories)
                .WithOne(e => e.Reservation)
                .HasForeignKey(e => e.ReservationId);
        }
    }
}
