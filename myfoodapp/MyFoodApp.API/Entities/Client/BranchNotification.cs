using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchNotification
    {
        [Key]
        [JsonConverter(typeof(JsonEncrypterConverter<long>))]
        public long Id { get; set; }
        public int BranchId { get; set; }
        public int NotificationTypeId { get; set; }
        [JsonConverter(typeof(JsonObjectConverter<long, string>))]
        public long EventId { get; set; }
        public DateTime SentDateTime { get; set; }
        public bool Read { get; set; }
        public string Notes { get; set; }
        public virtual Branch Branch { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Event Event { get; set; }
        public virtual BranchNotificationType BranchNotificationType { get; set; }
    }

}
