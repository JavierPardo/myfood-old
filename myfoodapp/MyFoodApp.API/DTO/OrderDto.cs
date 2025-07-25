using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class OrderDto
    {
        public IEnumerable<OrderItemDto> OrderDetail { get; set; }
        public CustomerDto Customer { get; set; }
        public ICollection<PaymentDto> Payments { get; set; }

        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int OrderStatus { get; set; }
        public KeyValueDto<int> OrderStatusDetail { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }
    }
}
