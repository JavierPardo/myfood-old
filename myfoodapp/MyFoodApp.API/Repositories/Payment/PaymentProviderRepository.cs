using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class PaymentProviderRepository:EntityModelRepository<PaymentProvider,int>,IPaymentProviderRepository
    {
        public PaymentProviderRepository(DataContext dataContext, ILogger<PaymentProvider> logger):base(dataContext, logger)
        {

        }
    }
}