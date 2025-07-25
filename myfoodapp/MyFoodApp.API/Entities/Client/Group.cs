using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [NotMapped]
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<BranchesGroups> BranchesGroups { get; set; }      
    }
}
