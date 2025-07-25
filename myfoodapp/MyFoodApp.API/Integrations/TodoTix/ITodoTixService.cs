using MyFoodApp.API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace MyFoodApp.API.Integrations
{
    public interface ITodoTixService
    {
        void SuccessfulPaymentNotification(int transactionID);
        Task<string> CreateDebtAsyncByEventId(RegisterDebtDTO debtDTO);
        void UpdatePaymentEvent(long eventId);       
    }
}
