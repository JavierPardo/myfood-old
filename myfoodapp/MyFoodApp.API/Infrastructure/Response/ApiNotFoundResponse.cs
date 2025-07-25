using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Response
{
    public class ApiNotFoundResponse : ApiResponse
    {
        public IEnumerable<string> Errors { get; }


        public ApiNotFoundResponse(object result)
            : base(404)
        {
            Errors = new string[] { $"Object was not found" };
        }
    }
}
