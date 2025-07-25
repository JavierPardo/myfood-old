using System;

namespace MyFoodApp.API.DTO
{
    public class LogisticReconciliationByDateReportDto
    {
        public long Id { get; set; }
        public string TransactionDate { get; set; }
        public string TransactionTime { get; set; }
        public long EventId { get; set; }
        public decimal AmountTransaction { get; set; }
        public string MethodType { get; set; }
        public decimal DeliveryCost { get; set; }
        public double? DispatchTime { get; set; }
        public DateTime? ConciliationDate { get; set; }
        public long? ConciliationId { get; set; }
    }
}