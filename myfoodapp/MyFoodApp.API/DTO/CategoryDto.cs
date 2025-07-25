using Microsoft.AspNetCore.Http;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class CategoryDto
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public bool? IsVisibleInMenu { get; set; }
        public IEnumerable<MenusCategories> MenusCategories { get; set; }
    }
}
