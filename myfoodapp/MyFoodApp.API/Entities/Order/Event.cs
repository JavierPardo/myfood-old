using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using MyFoodApp.API.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;

namespace MyFoodApp.API.Entities
{
    public class Event
    {
        public Event()
        {
            StartDateTime = DateTime.Now;
        }
        public long Id { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        [Column(TypeName = "jsonb")]
        public string Details { get; set; }     
        public long AppUserId { get; set; }
        public int BranchId { get; set; }
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int TypeId { get; set; } //pickup, delivery, camarero
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int CurrentStatusId { get; set; }
        public string TableNumber { get; set; } //solo aplica para camarero virtual
        public int? LogisticsProviderId { get; set; } //solo si es delivery
        public decimal TotalAmount { get; set; }        
        public decimal MyFoodAppFeeAmount
        {  //Total comisión cliente paga a MyFoodApp
            get
            {
                if (Transactions != null)
                    return Transactions.Select(x => x.MyFoodAppFeeAmount).Sum();
                else
                    return 0;
            }
        }
        public decimal PaymentProcessorFeeAmount
        {  //Total comisión MyFoodApp paga a procesador de pago
            get
            {
                if (Transactions != null)
                    return Transactions.Select(x => x.PaymentProcessorFeeAmount).Sum();
                else
                    return 0;
            }
        }
        [NotMapped]
        public string CouponCode { get; set; }
        [JsonConverter(typeof(JsonEncrypterConverter<long?>))]
        public long? CouponId { get; set; }
        public decimal? CouponDiscountAmount { get; set; }
        public long? DestinationLocationId { get; set; }  //Id de location del usuario a donde se enviará el pedido en caso de delivery
        public decimal? DeliveryDistanceKm { get; set; }
        public decimal? DeliveryCost { get; set; } //solo si es delivery
        public virtual Location DestinationLocation { get; set; }
        [JsonIgnore]
        public virtual User AppUser { get; set; }
        [NotMapped]
        public AppUserModel User { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual Reservation Reservation { get; set; }  //puede o no tener una reserva asociada al pedido
        public virtual EventType EventType { get; set; }
        public virtual EventStatus EventStatus { get; set; }
        public virtual ICollection<ClientTransaction> Transactions { get; set; }
        public virtual Coupon Coupon { get; set; }
        public virtual ICollection<Order> Orders { get; set; } //para entrega es 1 orden por evento
        public virtual ICollection<EventStatusHistory> EventStatusHistories { get; set; }
        public virtual ICollection<BranchNotification> BranchNotifications { get; set; }
    }
    public class EventEntityConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            //Event - EventStatusHistories
            builder
              .HasMany(e => e.EventStatusHistories)
              .WithOne(e => e.Event)
              .HasForeignKey(e => e.EventId);
            //Event - Orders
            builder
               .HasMany(e => e.Orders)
               .WithOne(e => e.Event)
               .HasForeignKey(e => e.EventId);
            //Event - ClientTransactions
            builder
              .HasMany(e => e.Transactions)
              .WithOne(e => e.Event)
              .HasForeignKey(e => e.EventId);
            //Event - BranchNotifications
            builder
                .HasMany(e => e.BranchNotifications)
                .WithOne(e => e.Event)
                .HasForeignKey(e => e.EventId);

        }
    }
}
