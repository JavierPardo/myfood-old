using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using MyFoodApp.API.Infrastructure.JsonConverters;

namespace MyFoodApp.API.DTO
{
    public class ReservationsByDateAndStatusDto
    {
        public long Id { get; set; }
        public DateTime ReservationDateTime { get; set; }
        public DateTime RequestedDateTime { get; set; }  //fecha 
        public string AppUserFullName { get; set; }
        public string AppUserFirstName { get; set; }
        public string AppUserLastName { get; set; }
        public string AppUserPhoneNumber { get; set; }
        public int BranchId { get; set; }
        public int NumberOfGuests { get; set; }
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int CurrentStatusId { get; set; }
        public long? TransactionId { get; set; }
        public ICollection<PaymentDto> Payments { get; set; }
        public string Notes { get; set; }
        public List<OrderDetailDto> OrderDetail { get; set; }
    }
}
