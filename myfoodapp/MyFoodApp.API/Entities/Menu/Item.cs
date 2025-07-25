using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace MyFoodApp.API.Entities
{
    public class Item
    {
        public Item()
        {

        }
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int Position { get; set; }

        [NotMapped]
        public string Image { get; set; }

        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<int, string>))]
        public int PrepTimeMins { get; set; }
        
        [System.Text.Json.Serialization.JsonConverter(typeof(JsonObjectConverter<decimal, string>))]
        public decimal CurrentPrice { get; set; }
        public int NumberSidesRequired { get; set; }
        public bool OptionsRequired { get; set; }
        public bool IsActive { get; set; }
        public virtual IEnumerable<CategoriesItems> CategoriesItems { get; set; }
        public virtual IEnumerable<ItemsOptions> ItemsOptions { get; set; }
        public virtual ICollection<ItemPriceHistory> ItemPriceHistories { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public bool IsVisibleInMenu { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
    }
    public class ItemEntityConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder
                .HasMany(e => e.ItemPriceHistories)
                .WithOne(e => e.Item)
                .HasForeignKey(e => e.ItemId);
           
        }
    }
}
