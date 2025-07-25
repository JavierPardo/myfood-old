using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class ActionPoints
    {
        public int Id { get; set; }
        public ActionPointTypeEnum Action { get; set; }
        public int Points { get; set; }
        public string Notes { get; set; }
    }

}
