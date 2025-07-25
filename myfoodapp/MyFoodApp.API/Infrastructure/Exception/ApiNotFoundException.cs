using MyFoodApp.API.Infrastructure.Exception;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Exception
{
    public class ApiNotFoundException : ApiException//not authorized, BadRequest, Not allowed
    {
        public string MessageClient { get { return "ERROR_ENTITY_NOT_FOUND"; } }
        public string Entity { get; private set; }
        public string Identificator { get; private set; }
        public ApiNotFoundException(Type entityType, object identificator)
        {
            Entity = entityType.Name;
            Identificator = identificator.ToString();

            ErrorResult = new { Entity, Identificator, message=MessageClient };
            StatusCode = 404;
        }
    }
}
