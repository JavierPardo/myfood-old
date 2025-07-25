using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Rest.Video.V1.Room.Participant;

namespace MyFoodApp.API.Entities
{
    public class UserPointsTransaction
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public long UserId { get; set; }
        public UserPointTransactionTypeEnum TransactionType { get; set; }
        public int Points { get; set; }
        public ActionPointTypeEnum Action { get; set; }
        public string Notes { get; set; }
        public long? PointEventId { get; set; } //EventId o ReservationId asociada al INGRESO de puntos. 
        public int? PointsExchangeId { get; set; } //PointsExchangeId de la promo asociada al EGRESO de puntos. 
        public virtual User User { get; set; }
        public virtual PointsExchange PointsExchange { get; set; }

        public class UserPointTransactionConfiguration : IEntityTypeConfiguration<UserPointsTransaction>
        {
            public void Configure(EntityTypeBuilder<UserPointsTransaction> builder)
            {
              
            }
        }


    }
}
