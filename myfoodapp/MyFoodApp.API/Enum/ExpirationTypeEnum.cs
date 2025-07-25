using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum ExpirationTypeEnum:int
    {
        [Description("EXPIRATIONTYPE_DATE")]
        Date=1,
        [Description("EXPIRATIONTYPE_LIMIT")]
        Limit =2
    }
}
