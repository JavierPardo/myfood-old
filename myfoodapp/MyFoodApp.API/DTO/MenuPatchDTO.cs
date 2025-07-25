using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class MenuPatchDto
    {
        public string Name { get; set; }
        public bool? IsActive { get; set; }
    }
}
