using System.Collections.Generic;
using MyFoodApp.API.Infrastructure.JsonConverters;

namespace MyFoodApp.API.DTO
{
    public class OrderDetailItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<int, string>))]
        public int PrepTimeMins { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal, string>))]
        public decimal CurrentPrice { get; set; }
        public ICollection<OrderItemSelectedSidesDto> SelectedSides { get; set; }
        public ICollection<OrderItemSelectedOptionsDto> SelectedOptions { get; set; }
    }
}
