using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Extension
{ 
    public static class IFormFileExtension
    {
        public static byte[] ToByteArray(this IFormFile fileForm)
        {
            if (fileForm.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    fileForm.CopyTo(ms);
                    return ms.ToArray();
                }
            }
            return null;


        }
    }
}
