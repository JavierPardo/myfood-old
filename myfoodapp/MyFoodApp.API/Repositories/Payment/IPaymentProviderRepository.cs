using System;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IPaymentProviderRepository:IEntityModelRepository<PaymentProvider,int>
    {
    }
}