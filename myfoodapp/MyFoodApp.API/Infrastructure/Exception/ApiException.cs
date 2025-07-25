using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Exception
{
    public class ApiException:System.Exception
    {        
        public HttpStatusCode StatusCode { get; private set; }
        public string ContentType { get; set; } = @"text/plain";

        public ApiException(HttpStatusCode statusCode, string msg = null) : base(msg)
        {
            StatusCode = statusCode;
        }
        public ApiException(HttpStatusCode statusCode, System.Exception inner) : this(statusCode, inner.ToString()) { }

        public ApiException(HttpStatusCode statusCode, JObject errorObject) : this(statusCode, errorObject.ToString())
        {
            this.ContentType = @"application/json";
        }
    }
}
