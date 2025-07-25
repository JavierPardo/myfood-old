using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class MenusCategories
    {
        public long MenuId { get; set; }
        public virtual Menu Menu { get; set; }
        public long CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }

    public class MenusCategoriesEntityConfiguration : IEntityTypeConfiguration<MenusCategories>
    {
        public void Configure(EntityTypeBuilder<MenusCategories> builder)
        {
            //many-to-many
            builder
             .HasKey(e => new { e.CategoryId, e.MenuId });
            builder
               .HasOne(e => e.Menu)
               .WithMany(e => e.MenusCategories)
               .HasForeignKey(e => e.MenuId);
            builder
               .HasOne(e => e.Category)
               .WithMany(e => e.MenusCategories)
               .HasForeignKey(e => e.CategoryId);
        }
    }
}
