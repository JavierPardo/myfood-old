using Microsoft.AspNetCore.Http;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;

namespace MyFoodApp.API.DTO
{
    public class SideDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal?, string>))]
        public decimal? CurrentPrice { get; set; }
        public bool IsActive { get; set; }        
        public string Image { get; set; }
        public int BranchId { get; set; }
    }
}