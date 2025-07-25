using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum EventStatusEnum : int
    {
        [Description("ENUM_EVENTSTATUS_OPEN")]
        Open = 1,
        [Description("ENUM_EVENTSTATUS_CLOSED")]
        Closed = 2
    }
}
