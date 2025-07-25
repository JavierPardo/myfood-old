using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;

namespace MyFoodApp.API.Entities
{
    public class ClientTransaction
    {
        public ClientTransaction()
        {
            TransactionDateTime = DateTime.Now;
        }
        public long Id { get; set; }
        public int PaymentTypeId { get; set; }  //efectivo o pago online
        public string ProcessorTransactionId { get; set; }
        public long? EventId { get; set; }
        public long? ReservationId { get; set; }
        public string ProcessorAuthorizationId { get; set; }
        public string ProcessorDebtId { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public decimal Amount { get; set; }  //monto pagado
        public decimal PctMyFoodApp { get; set; } //% comisión cliente paga a MyFoodApp. Esto a nivel transacción porque un evento puede tener más de una transacción con diferentes tipos de pago.
        public decimal MyFoodAppFeeAmount { get; set; } //Total comisión cliente paga a MyFoodApp
        public decimal PaymentProcessorFeeAmount { get; set; }  //Total comisión MyFoodApp paga a procesador de pago
        [JsonConverter(typeof(JsonEncrypterConverter<int?>))]
        public int? CurrentStatusId { get; set; }
        public string Notes { get; set; }
        [NotMapped]
        public string ImageReference { get; set; }
        public long? ClientPaymentId { get; set; }  //pago de conciliación al cliente. Solo populada si transacción fue conciliada
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Event Event { get; set; }
        public virtual ClientPayment ClientPayment { get; set; }
        public virtual Invoice Invoice { get; set; }
        public virtual PaymentType PaymentType { get; set; }
        public virtual Reservation Reservation { get; set; }
        public virtual TransactionStatus TransactionStatus { get; set; }
    }
    public class ClientTransactionEntityConfiguration : IEntityTypeConfiguration<ClientTransaction>
    {
        public void Configure(EntityTypeBuilder<ClientTransaction> builder)
        {
            //ClientTransaction - PaymentType
            builder
                .HasOne(e => e.PaymentType)
                .WithMany(e => e.Transactions)
                .HasForeignKey(e => e.PaymentTypeId);
        }
    }
}
