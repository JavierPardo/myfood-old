using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Infrastructure.Exception;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Middleware
{
    public class ErrorWrappingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorWrappingMiddleware> _logger;

        public ErrorWrappingMiddleware(RequestDelegate next, ILogger<ErrorWrappingMiddleware> logger)
        {
            _next = next;
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Invoke(HttpContext context)
        {
            object response=null;
            try
            {
                await _next.Invoke(context);
            }
            catch (ApiException ex)
            {
                await HandleExceptionAsync(context, ex);
                _logger.LogError(JsonConvert.SerializeObject(ex));
            }
            catch (System.Exception exceptionObj)
            {
                await HandleExceptionAsync(context, exceptionObj);
                var traceId = Activity.Current?.Id ?? context?.TraceIdentifier;
                _logger.LogError(exceptionObj, $@"TraceId:{traceId} Exception:{exceptionObj.Message}");
            }

        }

        private Task HandleExceptionAsync(HttpContext context, ApiException exception)
        {
            string result = null;
            context.Response.ContentType = "application/json";
            if (exception is ApiException)
            {
                result = new ApiExceptionResponse((int)exception.StatusCode, exception.Message).ToString();
                context.Response.StatusCode = (int)exception.StatusCode;
            }
            else
            {
                result = new ApiExceptionResponse((int)HttpStatusCode.BadRequest, "Runtime Error").ToString();
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
            return context.Response.WriteAsync(result);
        }

        private Task HandleExceptionAsync(HttpContext context, System.Exception exception)
        {
            string result = new ApiExceptionResponse((int)HttpStatusCode.InternalServerError, exception.Message).ToString();
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return context.Response.WriteAsync(result);
        }
    }
}
