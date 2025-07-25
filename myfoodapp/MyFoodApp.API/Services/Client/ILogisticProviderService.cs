using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ILogisticProviderService
    {
        void Add(LogisticProvider logisticProvider);
        void Update(LogisticProvider logisticProvider);
        LogisticProvider Get(int id);
        IEnumerable<LogisticProvider> GetAll();
        void Delete(int id);
        void UpdateActiveFlag(LogisticProvider logisticProvider);
        IEnumerable<LogisticProvider> GetAllByBranch();
        IEnumerable<LogisticProvider> GetAllByClient();
        void UpdateDefaultFlag(BranchLogisticProvider logisticProvider);
    }
}
