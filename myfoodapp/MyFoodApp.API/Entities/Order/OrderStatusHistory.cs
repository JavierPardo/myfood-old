using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class OrderStatusHistory
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int StatusId { get; set; }
        public DateTime ChangeDateTime { get; set; }
        public long AdminUserId { get; set; }
        public virtual User AdminUser { get; set; }
        public virtual Order Order { get; set; }
    }

}
