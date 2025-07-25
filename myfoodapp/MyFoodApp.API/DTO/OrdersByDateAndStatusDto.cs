using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.JsonConverters;
using MyFoodApp.API.Models;

namespace MyFoodApp.API.DTO
{
    public class OrdersByDateAndStatusDto
    {
        public long Id { get; set; }
        public DateTime CreateOrderDateTime { get; set; }

        [Column(TypeName = "jsonb")]
        public string Details { get; set; }
        public string AppUserFullName { get; set; }
        public string AppUserFirstName { get; set; }
        public string AppUserLastName { get; set; }
        public string AppUserPhoneNumber { get; set; }
        public int BranchId { get; set; }
        public decimal TotalAmount { get; set; }
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int TypeId { get; set; } //pickup, delivery, camarero
        public string EventType { get; set; }
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int CurrentStatusId { get; set; }
        public string TableNumber { get; set; } //solo aplica para camarero virtual
        public decimal? DeliveryCost { get; set; } //solo si es delivery
        public ICollection<PaymentDto> Payments { get; set; }
        public OrderDetailDto OrderDetail { get; set; }
    }
}
