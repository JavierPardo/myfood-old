using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class WebUserDto
    {
        public string Fullname { get; set; }

        [JsonIgnore]
        public string[] RolesText { get; set; }
        
        public IEnumerable<string> Roles
        {
            get
            {
                return RolesText.Select(role => role.EncodeAsBase32String());
            }
        }
    }
}
