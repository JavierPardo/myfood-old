using MyFoodApp.API.Entities;

namespace MyFoodApp.API.DTO
{
    public class LocationDto
    {
        public long Id { get; set; }
        public string Coordinates { get; set; }
        public string Address { get; set; }
        public string IconIndex { get; set; }
        public string Notes { get; set; }
        public Zone Zone { get; set; }
        public City City { get; set; }
        public Country Country { get; set; }
    }
}
