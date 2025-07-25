using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchPreferences
    {
        [Key]
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int BranchId { get; set; }
        [Key]
        public string PreferenceName { get; set; } 
        public string PreferenceValue { get; set; }
        [JsonPropertyName("type")]
        public string ValueDataType { get; set; }
        public bool SuperAdminOnly { get; set; }
        public virtual Branch Branch { get; set; }
    }

    public class BranchPreferencesEntityConfiguration : IEntityTypeConfiguration<BranchPreferences>
    {
        public void Configure(EntityTypeBuilder<BranchPreferences> builder)
        {
            builder
               .HasKey(p => new { p.BranchId, p.PreferenceName });                        
        }
    }
}
