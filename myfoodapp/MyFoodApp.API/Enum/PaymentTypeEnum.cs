using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum PaymentTypeEnum:int
    {
        [Description("ENUM_PAYMENTTYPE_CASH")]
        Cash = 1,
        [Description("ENUM_PAYMENTTYPE_ONLINE")]
        Online = 2
    }
}
