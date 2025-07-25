namespace MyFoodApp.API.DTO
{
    public class CommissionsReconciliationByDateReportDto
    {
        public CommissionsReconciliationOnlineByDateReportDto CommissionsReconciliationOnlineByDateReport { get; set; }
        public CommissionsReconciliationCashByDateReportDto CommissionsReconciliationCashByDateReport { get; set; }
        public decimal TotalDepositMyFoodAppToClient { get; set; }
    }
}