using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MyFoodApp.API.Infrastructure.JsonConverters;

namespace MyFoodApp.API.Entities
{
    public class Category
    {
        public long Id { get; set; }
        public string Name { get; set; }
        [NotMapped]
        public string Image { get; set; }
        public int Position { get; set; }
        public bool IsActive { get; set; }        
        public virtual ICollection<MenusCategories> MenusCategories { get; set; }
        public virtual ICollection<CategoriesItems> CategoriesItems { get; set; }
        public bool IsVisibleInMenu { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
    }
}
