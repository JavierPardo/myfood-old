using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Favorite
    {
        public long Id { get; set; }
        public long MenuItemId { get; set; }
        public long UserId { get; set; }
        public virtual User User { get; set; }
    }
}
