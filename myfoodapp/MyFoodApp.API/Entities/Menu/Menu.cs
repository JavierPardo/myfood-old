using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Menu
    {
        public long Id { get; set; }
        public int BranchId { get; set; }
        [Column("MenuName")]
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ICollection<MenusCategories> MenusCategories { get; set; }
    }
}
