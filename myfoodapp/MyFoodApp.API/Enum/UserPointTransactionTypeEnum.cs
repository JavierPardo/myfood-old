using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum UserPointTransactionTypeEnum : int
    {
        [Description("POINTTRANSACTION_IN")]
        In = 1,
        [Description("POINTTRANSACTION_PUT")]
        Out = 2
    }
}
