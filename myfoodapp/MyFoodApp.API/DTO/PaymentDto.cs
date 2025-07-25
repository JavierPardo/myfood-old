using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class PaymentDto
    {
        public string TransactionImage { get; set; }
        public string Reference { get; set; }
        public string MethodType { get; set; }
        public bool TransactionConfirmed { get; set; }
    }
}
