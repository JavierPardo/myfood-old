using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum CouponTypeEnum : int
    {
        [Description("COUPONTYPE_ADMIN")]
        Percentage=1,
        [Description("COUPONTYPE_CLIENT")]
        Amount =2
    }
}
