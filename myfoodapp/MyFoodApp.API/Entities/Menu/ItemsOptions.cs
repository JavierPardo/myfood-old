using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ItemsOptions
    {
        public long ItemId { get; set; }
        public virtual Item Item { get; set; }
        public long OptionId { get; set; }
        public virtual Option Option { get; set; }
    }

    public class ItemsOptionsEntityConfiguration : IEntityTypeConfiguration<ItemsOptions>
    {
        public void Configure(EntityTypeBuilder<ItemsOptions> builder)
        {
            //many-to-many
           builder
              .HasKey(e => new { e.ItemId, e.OptionId });
            builder
               .HasOne(e => e.Item)
               .WithMany(e => e.ItemsOptions)
               .HasForeignKey(e => e.ItemId);
            builder
               .HasOne(e => e.Option)
               .WithMany(e => e.ItemsOptions)
               .HasForeignKey(e => e.OptionId);
        }
    }
}
