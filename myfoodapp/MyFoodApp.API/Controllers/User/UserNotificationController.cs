using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Integrations;
using Twilio.Rest.Api.V2010.Account;

namespace MyFoodApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotificationController : ControllerBase
    {
        private readonly IUserNotificationService _userNotification;
        private readonly ITwilioService _twilioService;
        private readonly IMessagingHelperService _messagingHelperService;

        public UserNotificationController(IUserNotificationService userNotification,
            ITwilioService twilioService, IMessagingHelperService messagingHelperService)
        {
            _userNotification = userNotification;
            _twilioService = twilioService;
            _messagingHelperService = messagingHelperService;
        }


        // GET api/<UserNotificationController>/123198
        [Authorize(Roles = "Super Admin, User")]
        [HttpGet("user")]
        public IEnumerable<UserNotification> GetNotifcationsByCurrentUserId()
        {
            return _userNotification.GetNotifcationsByCurrentUserId();
        }

        // GET api/<UserNotificationController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpGet("{id}")]
        public UserNotification GetByNotificationId(long id)
        {
            return _userNotification.Get(id);
        }

        // POST api/<UserNotificationController>
        [Authorize(Roles = "Super Admin")]
        [HttpPost]
        public void AddNotification([FromBody] UserNotification userNotification)
        {
            _userNotification.Add(userNotification);
        }

        // PUT api/<UserNotificationController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpPut("{id}")]
        public void UpdateNotification(long id, [FromBody] UserNotification userNotification)
        {
            _userNotification.Update(userNotification);
        }

        // PUT api/<UserNotificationController>/5
        [Authorize(Roles = "Super Admin, User")]
        [HttpPut("markread")]
        public void MarkReadNotification(string idList)
        {
            _userNotification.MarkRead(idList.Split(',').Select(x=>Convert.ToInt64(x)));
        }

        // DELETE api/<UserNotificationController>/5
        [Authorize(Roles = "Super Admin")]
        [HttpDelete("{id}")]
        public void DeleteNotification(long id)
        {
            _userNotification.Delete(id);
        }

        // POST api/<UserNotificationController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost("sendsms")]
        public async Task<MessageResource> SendSms([FromBody] ITwilioMessage message)
        {
            return await _twilioService.SendSms(message); 
        }

        // POST api/<UserNotificationController>
        [Authorize(Roles = "Super Admin, Employee, Admin")]
        [HttpPost("requestdelivery/{eventId}")]
        public async Task<string> RequestDelivery(long eventId)
        {
            return await _messagingHelperService.SendDeliveryRequestMessage(eventId);
        }
    }
}
