using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public interface ISocialLoginService
    {
        string GetEmailByFacebookToken(string token);
        string GetEmailByGmailToken(string token);
    }
}
