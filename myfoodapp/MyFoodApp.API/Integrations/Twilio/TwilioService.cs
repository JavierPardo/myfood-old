using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Exceptions;
using System.Net;
using Twilio.Types;

namespace MyFoodApp.API.Integrations
{
    public class TwilioService : ITwilioService
    {
        private readonly string accountSid;
        private readonly string authToken;
        private readonly string SmsOriginNumber;
        private readonly string WhatsappOriginNumber;

        public TwilioService(IConfiguration configuration)
        {
            accountSid = configuration["Twilio:AccountSid"];
            authToken = configuration["Twilio:AuthToken"];
            SmsOriginNumber = configuration["Twilio:SMSOriginNumber"];
            WhatsappOriginNumber = configuration["Twilio:WhatsappOriginNumber"];            
        }

        public async Task<MessageResource> SendSms(ITwilioMessage msg)
        {
            TwilioClient.Init(accountSid, authToken);

            try
            {
                var objMsg = await MessageResource.CreateAsync(
                    body: msg.MessageBody,
                    from: new Twilio.Types.PhoneNumber(SmsOriginNumber),
                    to: new Twilio.Types.PhoneNumber(msg.ToPhoneNumber)
                );
                return objMsg;
            }
            catch (TwilioException ex)
            {
                throw new MyFoodApp.API.Infrastructure.Exception.ApiException(HttpStatusCode.BadRequest, ex.Message);
              }
        }

        public async Task<MessageResource> SendWhatsapp(ITwilioMessage msg)
        {           
            TwilioClient.Init(accountSid, authToken);

            try
            {
                var objMsg = await MessageResource.CreateAsync(
                    body: msg.MessageBody,
                    from: new PhoneNumber("whatsapp:" + WhatsappOriginNumber),
                    to: new PhoneNumber("whatsapp:" + msg.ToPhoneNumber)
                );
                return objMsg;
            }
            catch (TwilioException ex)
            {
                throw new MyFoodApp.API.Infrastructure.Exception.ApiException(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    }
}
