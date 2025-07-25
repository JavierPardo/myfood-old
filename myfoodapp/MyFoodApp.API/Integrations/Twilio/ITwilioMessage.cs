using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Integrations
{
    public class ITwilioMessage
    {
        public string ToPhoneNumber { get; set; }
        public string MessageBody { get; set; }
    }
}
