using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchesGroups
    {
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public int GroupId { get; set; }
        public virtual Group Group { get; set; }
    }

    public class ClientGroupsEntityConfiguration : IEntityTypeConfiguration<BranchesGroups>
    {
        public void Configure(EntityTypeBuilder<BranchesGroups> builder)
        {
            //many-to-many
            builder
                 .HasKey(e => new { e.BranchId, e.GroupId });
            builder
               .HasOne(e => e.Branch)
               .WithMany(e => e.BranchesGroups)
               .HasForeignKey(e => e.BranchId);
            builder
               .HasOne(e => e.Group)
               .WithMany(e => e.BranchesGroups)
               .HasForeignKey(e => e.GroupId);            

        }
    }
}
