using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum ReservationStatusEnum : int
    {
        [Description("ENUM_RESERVATIONSTATUS_TOCONFIRM")]
        ToConfirm =1,
        [Description("ENUM_RESERVATIONSTATUS_PAYMENTREJECTED")]
        PaymentRejected =2,
        [Description("ENUM_RESERVATIONSTATUS_REJECTED")]
        Rejected =3,
        [Description("ENUM_RESERVATIONSTATUS_CONFIRMED")]
        Confirmed =4
    }
}
