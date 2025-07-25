using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ClientsAdminUsers
    {
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }
        public long UserId { get; set; }
        public virtual User User { get; set; }

        public long getUserId()
        {
            return 1;
        }
    }
    public class ClientsUsersEntityConfiguration : IEntityTypeConfiguration<ClientsAdminUsers>
    {
        public void Configure(EntityTypeBuilder<ClientsAdminUsers> builder)
        {
            //many-to-many
            builder
                .HasKey(e => new { e.ClientId, e.UserId });
            builder
               .HasOne(e => e.Client)
               .WithMany(e => e.ClientsUsers)
               .HasForeignKey(e => e.ClientId);
            builder
                .HasOne(e => e.User)
               .WithMany(e => e.ClientsAdminUsers)
               .HasForeignKey(e => e.UserId);
        }
    }
}
