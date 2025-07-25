using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Infrastructure.Extension;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyFoodApp.API.Entities
{
    public class ImageCollection
    {        
        public int Id { get; set; }
        public AdSectionEnum SectionName { get; set; }
        public int? BranchId { get; set; } //only populated if SectionName = ADSECTION_MENU
        public string Name { get; set; }
        public bool IsActive { get; set; } 
        public IEnumerable<AdImage> AdImages { get; set; }
        public virtual Branch Branch { get; set; }
       
    }

    public class ImageCollectionConfiguration : IEntityTypeConfiguration<ImageCollection>
    {
        public void Configure(EntityTypeBuilder<ImageCollection> builder)
        {           
            builder
               .HasMany(e => e.AdImages)
               .WithOne(e => e.ImageCollection)
               .HasForeignKey(e => e.CollectionId);
        }
    }
}
