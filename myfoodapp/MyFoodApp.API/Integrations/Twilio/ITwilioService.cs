using MyFoodApp.API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace MyFoodApp.API.Integrations
{
    public interface ITwilioService
    {
        Task<MessageResource> SendSms(ITwilioMessage msg);
        Task<MessageResource> SendWhatsapp(ITwilioMessage msg);
    }
}
