using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class KeyValueDto<T>
    {
        public T Id { get; set; }
        public string Description{ get; set; }
    }
}
