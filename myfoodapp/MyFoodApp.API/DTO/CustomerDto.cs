﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class CustomerDto
    {
        public AddressDto Address { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email{ get; set; }
    }
}
