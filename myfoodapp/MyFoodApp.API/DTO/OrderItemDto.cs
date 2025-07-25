using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int OrderItemId { get; set; }
        public int ExtraId { get; set; }
        public string DetailId
        {
            get
            {
                if (ExtraId != 0)
                {
                    return ExtraId.ToString();

                }
                else
                {
                    if (Sides == null)
                    {
                        return string.Empty;
                    }
                    var sideDetailId = String.Join("/", Sides.Select(side => side.Id));
                    return $"{OrderItemId}-{sideDetailId}-{Option.Id}";
                }
            }
        }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<int, string>))]
        public int PrepTimeMins { get; set; }

        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal, string>))]
        public decimal CurrentPrice { get; set; }
        public KeyValueDto<int> Option { get; set; }
        public ICollection<KeyValueDto<int>> Sides { get; set; }
    }
}
