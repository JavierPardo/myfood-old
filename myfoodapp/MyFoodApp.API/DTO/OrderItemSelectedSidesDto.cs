namespace MyFoodApp.API.DTO
{
    public class OrderItemSelectedSidesDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public decimal Price { get; internal set; }
    }
}
