using System;

namespace MyFoodApp.API.Entities
{
    public class ClientPayment
    {
        public long Id { get; set; }
        public int ClientId { get; set; }

        public virtual Client Client { get; set; }
        public DateTime TransactionStartDate { get; set; }
        public DateTime TransactionEndDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string ConfirmationNumber { get; set; }
        public string BankFrom { get; set; }
        public long UserId { get; set; }
        public virtual User User { get; set; }
    }
}
