using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Exception
{
    public class ApiBadRequestException:ApiException
    {
        public string MessageClient { get { return "BAD_REQUEST"; } }
        
        
        public ApiBadRequestException( string[] messages)
        {
            ErrorResult = new { message = string.Join(",", messages) };
            StatusCode = 400;
        }
    }
}
