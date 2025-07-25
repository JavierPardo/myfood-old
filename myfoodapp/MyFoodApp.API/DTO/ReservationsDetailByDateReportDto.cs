namespace MyFoodApp.API.DTO
{
    public class ReservationsDetailByDateReportDto
    {
        public long Id { get; set; }
        public string ReservationDate { get; set; }
        public string ReservationTime { get; set; }
        public string RequestedDate { get; set; }
        public string RequestedTime { get; set; }
        public string EventTypeName { get; set; }
        public string Prepaid { get; set; }
        public long NumberOfGuests { get; set; }
    }
}