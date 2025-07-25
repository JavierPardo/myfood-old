using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum ActionPointTypeEnum : int
    {
        [Description("ACTIONPOINTTYPES_PICKUP")]
        Pickup = 1,
        [Description("ACTIONPOINTTYPES_DELIVERY")]
        Delivery = 2,
        [Description("ACTIONPOINTTYPES_RESERVATION")]
        Reservation = 3,
        [Description("ACTIONPOINTTYPES_VIRTUALWAITER")]
        VirtualWaiter = 4,
        [Description("ACTIONPOINTTYPES_REGISTRATION")]
        Registration = 5,
        [Description("ACTIONPOINTTYPES_BONUS")]
        Bonus = 6
    }
}
