using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Infrastructure.Extension;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyFoodApp.API.Entities
{
    public class AdImage
    {        
        public int Id { get; set; }
        public int CollectionId { get; set; }
        public string ImageUrl { get; set; }
        public string ImageLink { get; set; }
        public string Parameters { get; set; }
        public virtual ImageCollection ImageCollection { get; set; }
       
    }

}
