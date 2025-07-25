using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum CouponDiscountTypeEnum : int
    {
        [Description("COUPONDISCOUNTTYPE_PERCENTAGE")]
        Percentage=1,
        [Description("COUPONDISCOUNTTYPE_AMOUNT")]
        Amount =2
    }
}
