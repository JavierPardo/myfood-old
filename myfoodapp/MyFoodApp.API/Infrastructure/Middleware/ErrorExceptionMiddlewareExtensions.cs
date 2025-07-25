using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Models;
using System.Net;
using MyFoodApp.API.Infrastructure.Exception;

namespace MyFoodApp.API.Infrastructure.Middleware
{
    public static class ExceptionMiddlewareExtensions
    {
        //public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
        //{
        //    app.UseExceptionHandler(appError =>
        //    {
        //        appError.Run(async context =>
        //        {
        //            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        //            context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //            context.Response.ContentType = "application/json";

        //            var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
        //            if (contextFeature != null)
        //            {
        //                logger.LogError($"Something went wrong: {contextFeature.Error}");

        //                await context.Response.WriteAsync(new ApiException()
        //                {
        //                    StatusCode = context.Response.StatusCode,
        //                    ErrorResult = "Internal Server Error."
        //                }.ToString());
        //            }
        //        });
        //    });
        //}
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorWrappingMiddleware>();
        }
    }
}
