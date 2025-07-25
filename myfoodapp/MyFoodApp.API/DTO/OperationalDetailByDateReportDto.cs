namespace MyFoodApp.API.DTO
{
    public class OperationalDetailByDateReportDto
    {
        public long Id { get; set; }
        public string DateCreated { get; set; }
        public string TimeCreated { get; set; }
        public string EventTypeName { get; set; }
        public string DateRejected { get; set; }
        public string TimeRejected { get; set; }
        public double? ResponseTime { get; set; }
        public string Reason { get; set; }
    }
}