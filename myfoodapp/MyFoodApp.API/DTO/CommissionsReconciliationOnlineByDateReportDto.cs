using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class CommissionsReconciliationOnlineByDateReportDto
    {
        public IEnumerable<CommissionReconciliationOnlineByDateReportDto> CommissionReconciliationOnlineByDateReport { get; set; }
        public decimal TotalAmountTransactionBs { get; set; }
        public decimal TotalDeliveryCostBs { get; set; }
        public decimal TotalMyFoodAppFeeAmountBs { get; set; }
        public decimal TotalTotalAmountClientBs { get; set; }
    }
}