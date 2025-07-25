using System;

namespace MyFoodApp.API.DTO
{
    public class OrderDetailByDateReportDto
    {
        public long Id { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public decimal TotalAmount { get; set; }
        public string FullNameAppUser { get; set; }
        public string EventTypeName { get; set; }
        public decimal? DeliveryCost { get; set; } //solo si es delivery
        public decimal TotalOrderPlusDeliveryCost { get; set; }
        public decimal TotalPaidMinusTransaction { get; set; }
        public long AmountItems { get; set; }
    }
}