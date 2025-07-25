using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class LogisticProviderRate
    {
        public int Id { get; set; }
        public int LogisticProviderId { get; set; }
        public virtual LogisticProvider LogisticProvider { get; set; }
        public int RateTypeId { get; set; }
        public virtual LogisticProviderRateType RateType { get; set; }
        public int StartRange { get; set; }
        public int EndRange { get; set; }
        public bool IsActive { get; set; }
        public decimal Fee { get; set; }
    }
}
