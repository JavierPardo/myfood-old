using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class OrdersByZoneAndDateDto
    {
        public long ZoneId { get; set; }
        public int Amount { get; set; }
    }
}