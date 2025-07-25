using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class CategoriesItems
    {
        public long ItemId { get; set; }
        public virtual Item Item { get; set; }
        public long CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }

    public class CategoriesItemsEntityConfiguration : IEntityTypeConfiguration<CategoriesItems>
    {
        public void Configure(EntityTypeBuilder<CategoriesItems> builder)
        {
            //many-to-many
            builder
                .HasKey(e => new { e.CategoryId, e.ItemId });
            builder
               .HasOne(e => e.Category)
               .WithMany(e => e.CategoriesItems)
               .HasForeignKey(e => e.CategoryId);
            builder
                .HasOne(e => e.Item)
               .WithMany(e => e.CategoriesItems)
               .HasForeignKey(e => e.ItemId);
        }
    }
}
