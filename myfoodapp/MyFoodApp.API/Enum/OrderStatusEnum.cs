using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum OrderStatusEnum : int
    {
        [Description("ENUM_ORDERSTATUS_TOBECONFIRMED")]
        ToBeConfirmed =1,
        [Description("ENUM_ORDERSTATUS_INPROCESS")]
        InProcess =2,
        [Description("ENUM_ORDERSTATUS_REJECTED")]
        Rejected =3,
        [Description("ENUM_ORDERSTATUS_READYTODISPATCH")]
        ReadyToDispatch =4,
        [Description("ENUM_ORDERSTATUS_DISPATCHED")]
        Dispatched =5,
        [Description("ENUM_ORDERSTATUS_DELIVERED")]
        Delivered =6,
        [Description("ENUM_ORDERSTATUS_PAYMENTREJECTED")]
        PaymentRejected = 8
    }
}
