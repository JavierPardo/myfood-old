using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ILogisticProviderRateTypeService
    {
        void Add(LogisticProviderRateType logisticProviderRate);
        void Update(LogisticProviderRateType logisticProviderRate);
        LogisticProviderRateType Get(int id);
        ICollection<LogisticProviderRateType> GetAll();
        void Delete(int id);
    }
}
