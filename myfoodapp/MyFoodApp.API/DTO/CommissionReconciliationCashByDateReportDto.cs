using System;

namespace MyFoodApp.API.DTO
{
    public class CommissionReconciliationCashByDateReportDto
    {
        public long Id { get; set; }
        public string TransactionDate { get; set; }
        public string TransactionTime { get; set; }
        public long EventId { get; set; }
        public decimal AmountTransaction { get; set; }
        public decimal DeliveryCost { get; set; }
        public decimal MyFoodAppFeeAmount { get; set; }
        public decimal TotalAmountClient { get; set; }
        public DateTime? ConciliationDate { get; set; }
        public long? ConciliationId { get; set; }
    }
}