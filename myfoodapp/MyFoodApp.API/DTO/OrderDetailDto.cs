using System;
using System.Collections.Generic;
using MyFoodApp.API.Infrastructure.JsonConverters;

namespace MyFoodApp.API.DTO
{
    public class OrderDetailDto
    {
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }
        public IEnumerable<OrderDetailItemDto> OrderDetailItem { get; set; }
        public IEnumerable<OrderDetailExtraDto> OrderDetailExtras { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CreateOrderDateTime { get; set; }
    }
}
