namespace MyFoodApp.API.DTO
{
    public class OperationalTimesByDateReportDto
    {
        public long Id { get; set; }
        public string DateTimeDone { get; set; }
        public string EventTypeName { get; set; }
        public string DateTimeRejected { get; set; }
        public double? ResponseTime { get; set; }
        public double? ProcessOrderTime { get; set; }
        public int? TimeEvent { get; set; }
        public double? DispatchTime { get; set; }
        public string OrderStatus { get; set; }
    }
}