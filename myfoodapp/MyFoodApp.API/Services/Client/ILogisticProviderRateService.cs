using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ILogisticProviderRateService
    {
        void Add(LogisticProviderRate logisticProviderRate);
        void Update(LogisticProviderRate logisticProviderRate);
        LogisticProviderRate Get(int id);
        ICollection<LogisticProviderRate> GetAll();
        void Delete(int id);
        IEnumerable<LogisticProviderRate> GetAllByBranch();
        void UpdateActiveFlag(LogisticProviderRate logisticProviderRate);
    }
}
