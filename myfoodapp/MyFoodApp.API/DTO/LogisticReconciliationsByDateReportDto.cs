using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class LogisticReconciliationsByDateReportDto
    {
        public IEnumerable<LogisticReconciliationByDateReportDto> LogisticReconciliationsByDateReport { get; set; }
        public decimal TotalAmountTransactionBs { get; set; }
        public decimal TotalDeliveryCostBs { get; set; }
    }
}