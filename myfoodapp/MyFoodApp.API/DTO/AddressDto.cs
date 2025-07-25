using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class AddressDto
    {
        public string Street { get; set; }
        public string Number { get; set; }
        public string Depto { get; set; }
        public string Reference { get; set; }
        
        public object Coordinates{ get; set; }
    }
}
