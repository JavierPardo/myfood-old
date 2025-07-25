namespace MyFoodApp.API.DTO
{
    public class RegisterDebtDTO
    {
        public long EventId { get; set; }
        public long ReservationId { get; set; }
        public string CallBackUrl { get; set; }
    }
}
