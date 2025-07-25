using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class ClientTransactionsByDateReportDto
    {
        public IEnumerable<ClientTransactionByDateReportDto> ClientTransactionsByDateReport { get; set; }
        public decimal TotalAmountTransactionBs { get; set; }
        public decimal TotalDeliveryCostBs { get; set; }
        public decimal TotalAmountProductBs { get; set; }
        public decimal TotalPctMyFoodAppBs { get; set; }
        public decimal TotalTotalAmountClientBs { get; set; }
    }
}