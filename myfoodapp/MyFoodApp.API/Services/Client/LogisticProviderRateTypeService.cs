using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class LogisticProviderRateTypeService : ILogisticProviderRateTypeService
    {
        private readonly ILogisticProviderRateTypeRepository _LogisticProviderRateTypeRepository;

        public LogisticProviderRateTypeService(ILogisticProviderRateTypeRepository LogisticProviderRateTypeRepository)
        {
            _LogisticProviderRateTypeRepository = LogisticProviderRateTypeRepository;
        }
        public void Add(LogisticProviderRateType LogisticProviderRateType) => _LogisticProviderRateTypeRepository.Create(LogisticProviderRateType);

        public void Delete(int id) => _LogisticProviderRateTypeRepository.DeleteByKey(id);

        public LogisticProviderRateType Get(int id) => _LogisticProviderRateTypeRepository.GetByKey(id);

        public ICollection<LogisticProviderRateType> GetAll() => _LogisticProviderRateTypeRepository.GetAll();

        public void Update(LogisticProviderRateType LogisticProviderRateType) => _LogisticProviderRateTypeRepository.Update(LogisticProviderRateType);
    }
}
