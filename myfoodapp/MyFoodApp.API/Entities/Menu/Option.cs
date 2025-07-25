using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Option
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        [Column(TypeName = "jsonb")]
        public string Choices { get; set; }
        public virtual ICollection<ItemsOptions> ItemsOptions { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<OrderItemSelectedOptions> OrderItemSelectedOptions { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
    }

}
