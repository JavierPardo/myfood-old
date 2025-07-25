using AutoMapper;
using AutoMapper.Configuration;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;
using RazorEngine;
using RazorEngine.Templating;

namespace MyFoodApp.API.Integrations
{
    public class MessagingHelperService : IMessagingHelperService
    {
        private JObject jsonTemplates;
        private readonly ILogisticProviderRepository _logisticProviderRepository;
        public readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;
        private readonly ITwilioService _twilioService;

        public MessagingHelperService(ILogisticProviderRepository logisticProviderRepository,
            IEventRepository eventRepository, IMapper mapper, ITwilioService twilioService)
        {
            _logisticProviderRepository = logisticProviderRepository;
            _eventRepository = eventRepository;
            _mapper = mapper;
            _twilioService = twilioService;
            jsonTemplates = LoadJson();
        }

        JObject LoadJson()
        {
            using (StreamReader r = new StreamReader("Integrations\\Twilio\\TwilioTemplates.json"))
            {
                string json = r.ReadToEnd();
                return JObject.Parse(json);
            }
        }

        public async Task<string> SendDeliveryRequestMessage(long eventId)
        {
            ITwilioMessage msg = new ITwilioMessage();
            var objEvent = _eventRepository.GetCompleteById(eventId, true);
            DeliveryRequestDto dto = _mapper.Map<DeliveryRequestDto>(objEvent);

            //get logistic provider whatsapp number
            var lp = _logisticProviderRepository.GetByKey((int)objEvent.LogisticsProviderId);
            msg.ToPhoneNumber = lp.Whatsapp;

            string template = string.Join("\n", jsonTemplates["Whatsapp"]["DeliveryRequest"].ToObject<string[]>());
            string razorResult = Engine.Razor
                .RunCompile(template,
                    "key",
                    null,
                    dto);
            msg.MessageBody = razorResult;
            MessageResource response = await _twilioService.SendWhatsapp(msg);
            return response.Sid.ToString();

        }
    }
}
