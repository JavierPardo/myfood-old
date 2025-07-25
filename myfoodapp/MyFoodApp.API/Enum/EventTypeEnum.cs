using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum EventTypeEnum:int
    {
        [Description("ENUM_EVENTTYPE_PICKUP")]
        PickUpOrder = 1,
        [Description("ENUM_EVENTTYPE_DELIVERY")]
        DeliveryOrder = 2,
        [Description("ENUM_EVENTTYPE_VIRTUALWAITER")]
        VirtualWaiter = 3,
        [Description("ENUM_EVENTTYPE_RESERVATION")]
        Reservation = 4
    }
}
