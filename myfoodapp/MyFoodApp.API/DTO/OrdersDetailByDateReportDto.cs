using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class OrdersDetailByDateReportDto
    {
        public IEnumerable<OrderDetailByDateReportDto> OrdersDetailByDateReport { get; set; }
        public decimal AmountOrders { get; set; }
        public decimal TotalAmountTotalBs { get; set; }
        public decimal TotalAmountAvgBs { get; set; }
        public decimal DeliveryCostTotalBs { get; set; }
        public decimal DeliveryCostAvgBs { get; set; }
        public decimal AmountItemsTotalBs { get; set; }
        public double AmountItemsAvgBs { get; set; }
    }
}