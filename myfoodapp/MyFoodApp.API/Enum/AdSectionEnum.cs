using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum AdSectionEnum:int
    {
        [Description("ADSECTION_HOME")]
        Home=1,
        [Description("ADSECTION_BRANCH")]
        Branch = 2,
        [Description("ADSECTION_MENU")]
        Menu = 3
    }
}
