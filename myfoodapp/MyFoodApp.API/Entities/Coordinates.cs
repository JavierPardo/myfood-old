using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class Coordinates
    {
        public decimal id { get; set; }
        [JsonProperty("lat")]
        public decimal latitude { get; set; }
        [JsonProperty("long")]
        public decimal longitude { get; set; }
    }
}
