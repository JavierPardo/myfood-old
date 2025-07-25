using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum GenderEnum:int
    {
        [Description("GENDER_MALE")]
        Male=1,
        [Description("GENDER_FEMALE")]
        Female =2
    }
}
