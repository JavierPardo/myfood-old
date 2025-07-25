using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.Extension;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyFoodApp.API.Entities
{
    public class Branch
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
        public string Whatsapp { get; set; }
        public string Website { get; set; }
        [JsonPropertyName("nit")]
        public string NIT { get; set; }
        [Column(TypeName = "jsonb")]
        public string Coordinates { get; set; }
        public int? ZoneId { get; set; }
        [NotMapped]
        public string BannerUrl { get; set; }
        [NotMapped]
        public string LogoUrl { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public int ClientId { get; set; }
        public bool IsActive { get; set; }
        public List<string> Tags { get; set; }
        public virtual Client Client { get; set; }
        public virtual ICollection<Menu> Menus { get; set; }
        public virtual Zone Zone { get; set; }
        public virtual City City { get; set; }
        public virtual Country Country { get; set; }
        public virtual IEnumerable<BranchPreferences> BranchPreferences { get; set; }
        public virtual IEnumerable<BranchExceptionDate> BranchExceptionDates { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<BranchesPaymentTypes> BranchesPaymentTypes { get; set; }
        public virtual ICollection<BranchesGroups> BranchesGroups { get; set; }
        public virtual IEnumerable<BranchesEventTypes> BranchesEventTypes { get; set; }
        public virtual ICollection<Coupon> Coupons{ get; set; }        
        public virtual ICollection<BranchLogisticProvider> BranchLogisticProviders { get; set; }
        public virtual ICollection<Side> Sides { get; set; }
        public virtual ICollection<Item> Items { get; set; }
        public virtual ICollection<BranchNotification> BranchNotifications { get; set; }
        public virtual ImageCollection ImageCollection { get; set; }

        [JsonPropertyName("id")]
        [NotMapped]
        public string EncryptedId
        {
            get
            {
                return Id.EncodeAsBase32String();
            }
            set
            {
                Id = value.DecodeFromBase32String<int>();
            }
        }
    }

    public class BranchEntityConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder
                .HasMany(e => e.Sides)
                .WithOne(e => e.Branch)
                .HasForeignKey(e => e.BranchId);
            builder
                .HasMany(e => e.BranchPreferences)
                .WithOne(e => e.Branch)
                .HasForeignKey(e => e.BranchId);
            builder
                .HasMany(e => e.Menus)
                .WithOne(e => e.Branch)
                .HasForeignKey(e => e.BranchId);
            builder
                 .HasMany(e => e.BranchNotifications)
                 .WithOne(e => e.Branch)
                 .HasForeignKey(e => e.BranchId);
            builder
                 .HasMany(e => e.Items)
                 .WithOne(e => e.Branch)
                 .HasForeignKey(e => e.BranchId);
        }
    }
}
