using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class LogisticProvider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Whatsapp { get; set; }
        public string Address { get; set; }
        public string WebSite { get; set; }
        public int CityId { get; set; }
        public virtual City City { get; set; }
        public int CountryId { get; set; }
        public bool IsActive { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<BranchLogisticProvider> BranchLogisticProviders { get; set; }
        public virtual ICollection<LogisticProviderRate> LogisticProviderRates { get; set; }
    }
}
