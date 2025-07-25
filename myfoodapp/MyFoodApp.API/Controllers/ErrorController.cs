using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Infrastructure.Exception;
using Newtonsoft.Json;

namespace MyFoodApp.API.Controllers
{
    [ApiController]
    public class ErrorController : Controller
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        [Route("error")]
        public IActionResult Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            if (HttpContext.Request.Headers["Accept"] == "text/json")
            {
                if (context.Error is ApiException)
                {
                    ApiException exception = ((ApiException)context.Error);
                    return Problem(
                        detail: JsonConvert.SerializeObject(new
                        {
                            errorResult = exception.InnerException
                        }),
                        statusCode: (int)exception.StatusCode,
                        title: context.Error.Message); ;
                }
                else
                {
                    return Problem(title: "errors.general",
                        statusCode: 500,
                        type: "",
                        detail: "");
                }
            }
            else
                return View("error");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [Route("/error-development")]
        public IActionResult Error([FromServices] IWebHostEnvironment webHostEnvironment)
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            if (HttpContext.Request.Headers["Accept"] == "text/json")
            {
                ApiException exception = null;
                if (context.Error is ApiException)
                {
                    exception = ((ApiException)context.Error);
                    return Problem(
                        detail: JsonConvert.SerializeObject(new
                        {
                            errorResult = exception.InnerException,
                            detail = context.Error.StackTrace
                        }),
                        statusCode: (int)exception.StatusCode,
                        title: context.Error.Message);
                }
                else
                {
                    exception = ((ApiException)context.Error);
                    return Problem(
                        detail: JsonConvert.SerializeObject(new
                        {
                            errorResult = exception == null ? null : exception.InnerException,
                            detail = context.Error.StackTrace
                        }),
                        statusCode: 500,
                        title: context.Error.Message);
                }
            }
            else
                return View("error");
        }

    }
}
