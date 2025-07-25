using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class BranchDto
    {
        public string BranchName { get; set; }
        public string ClientName { get; set; }
        public string BannerUrl { get; set; }
        public string LogoUrl { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Coordinates { get; set; }
        public string NIT { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
        public string Whatsapp { get; set; }
        public string Website { get; set; }
        public virtual ICollection<BranchesEventTypes> BranchesEventTypes { get; set; }
        public LogisticProvider LogisticProviderDefault { get;  set; }
    }
}
