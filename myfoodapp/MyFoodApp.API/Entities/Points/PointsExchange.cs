using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class PointsExchange
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RequiredPoints { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<UserPointsTransaction> UserPointTransactions { get; set; }

        public class UserEntityConfiguration : IEntityTypeConfiguration<PointsExchange>
        {
            public void Configure(EntityTypeBuilder<PointsExchange> builder)
            {

                builder.HasMany(e => e.UserPointTransactions)
               .WithOne(e => e.PointsExchange)
               .HasForeignKey(e => e.PointsExchangeId);
            }
        }
    }
}
