using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Client
    {
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int Id { get; set; }
        public string ClientName { get; set; }
        public bool IsActive { get; set; }
        [NotMapped]
        public string BannerURL { get; set; }
        [NotMapped]
        public string LogoURL { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }
        public virtual ICollection<ClientsAdminUsers> ClientsUsers { get; set; }
        public virtual ICollection<Coupon> Coupons { get; set; }

    }

    public class ClientEntityConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder
               .HasMany(e => e.Branches)
               .WithOne(e => e.Client)
               .HasForeignKey(e => e.ClientId);
        }
    }
}
