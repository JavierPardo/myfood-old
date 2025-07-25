using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchExceptionDate
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public string Service { get; set; }  //"Pedido" o "Reserva"
        public bool IsClosed { get; set; } //si IsClosed=1, no hay atención y las horas estarán en blanco

        public virtual Branch Branch { get; set; }
        public DateTime? ExceptionDate { get; set; }
        [JsonConverter(typeof(JsonTimeSpanConverter))]
        public TimeSpan? TimeStart1 { get; set; }
        [JsonConverter(typeof(JsonTimeSpanConverter))]
        public TimeSpan? TimeStart2 { get; set; }
        [JsonConverter(typeof(JsonTimeSpanConverter))]
        public TimeSpan? TimeStart3 { get; set; }
        [JsonConverter(typeof(JsonTimeSpanConverter))]
        public TimeSpan? TimeEnd1 { get; set; }
        [JsonConverter(typeof(JsonTimeSpanConverter))]
        public TimeSpan? TimeEnd2 { get; set; }
        [JsonConverter(typeof(JsonTimeSpanConverter))]
        public TimeSpan? TimeEnd3 { get; set; }
    }
}
