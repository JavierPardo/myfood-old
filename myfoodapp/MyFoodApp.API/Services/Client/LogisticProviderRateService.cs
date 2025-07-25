using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class LogisticProviderRateService : ILogisticProviderRateService
    {
        private readonly ILogisticProviderRateRepository _providerRateTypeRepository;
        private readonly IUserSession _userSession;
        private readonly ILogisticProviderRateRepository _logisticProviderRateRepository;
        private readonly ILogisticProviderRepository _logisticProviderRepository;
        private readonly ILogisticProviderRateTypeRepository _LogisticProviderRateTypeRepository;
        public LogisticProviderRateService(ILogisticProviderRateRepository logisticProviderRateRepository, 
            ILogisticProviderRepository logisticProviderRepository,
            ILogisticProviderRateTypeRepository LogisticProviderRateTypeRepository,
            IUserSession userSession,
            ILogisticProviderRateRepository providerRateTypeRepository)
        {
            _providerRateTypeRepository = providerRateTypeRepository;
            _userSession = userSession;
            _logisticProviderRateRepository = logisticProviderRateRepository;
            _logisticProviderRepository = logisticProviderRepository;
            _LogisticProviderRateTypeRepository = LogisticProviderRateTypeRepository;
        }
        public void Add(LogisticProviderRate logisticProviderRate)
        {
            var rates = _logisticProviderRateRepository.GetAllByProvider(logisticProviderRate.LogisticProviderId);
            foreach (var rate in rates)
            {
                if (rate.RateTypeId == 2)
                    continue;
                if (rate.StartRange <= logisticProviderRate.StartRange && 
                    rate.EndRange > logisticProviderRate.StartRange)
                {
                    throw new ArgumentException("El Inicio de Rango se sobrepone a uno ya existente");
                }
                if (rate.StartRange < logisticProviderRate.EndRange &&
                    rate.EndRange >= logisticProviderRate.EndRange)
                {
                    throw new ArgumentException("El Final de Rango se sobrepone a uno ya existente");
                }
                if (rate.StartRange > logisticProviderRate.StartRange &&
                    rate.EndRange < logisticProviderRate.EndRange)
                {
                    throw new ArgumentException("El Rango se sobrepone a uno ya existente");
                }
            }
            _logisticProviderRateRepository.Create(logisticProviderRate);
        }

        public void Delete(int id) => _logisticProviderRateRepository.DeleteByKey(id);

        public LogisticProviderRate Get(int id) => _logisticProviderRateRepository.GetByKey(id);

        public ICollection<LogisticProviderRate> GetAll() {
            var providerRates = _logisticProviderRateRepository.GetAll();
            foreach (var providerRate in providerRates)
            {
                providerRate.LogisticProvider = _logisticProviderRepository.GetByKey(providerRate.LogisticProviderId);
                providerRate.RateType = _LogisticProviderRateTypeRepository.GetByKey(providerRate.RateTypeId);
            }
            return providerRates;
        }

        public IEnumerable<LogisticProviderRate> GetAllByBranch()
        {
            var providerRates = _logisticProviderRateRepository.GetAllByBranch(_userSession.BranchId);
            foreach (var providerRate in providerRates)
            {
                providerRate.LogisticProvider = _logisticProviderRepository.GetByKey(providerRate.LogisticProviderId);
                //providerRate.RateType = _providerRateTypeRepository.GetByKey(providerRate.RateTypeId);
            }
            return providerRates;
        }

        public void Update(LogisticProviderRate logisticProviderRate)
        {
            var rates = _logisticProviderRateRepository.GetAllByProvider(logisticProviderRate.LogisticProviderId);
            foreach (var rate in rates)
            {
                if (rate.RateTypeId == 2||rate.Id==logisticProviderRate.Id)
                    continue;
                if (rate.StartRange <= logisticProviderRate.StartRange &&
                    rate.EndRange > logisticProviderRate.StartRange)
                {
                    throw new ArgumentException("El Inicio de Rango se sobrepone a uno ya existente");
                }
                if (rate.StartRange < logisticProviderRate.EndRange &&
                    rate.EndRange >= logisticProviderRate.EndRange)
                {
                    throw new ArgumentException("El Final de Rango se sobrepone a uno ya existente");
                }
                if (rate.StartRange > logisticProviderRate.StartRange &&
                    rate.EndRange < logisticProviderRate.EndRange)
                {
                    throw new ArgumentException("El Rango se sobrepone a uno ya existente");
                }
            }
            _logisticProviderRateRepository.Update(logisticProviderRate);
        }

        public void UpdateActiveFlag(LogisticProviderRate logisticProviderRate)
        {
            var providerRate = _logisticProviderRateRepository.GetByKey(logisticProviderRate.Id);
            var rates = _logisticProviderRateRepository.GetAllByProviderAndActive(providerRate.LogisticProviderId);
            if(!providerRate.IsActive&&(providerRate.RateTypeId == 2||rates.Any()&&providerRate.RateTypeId!= rates.FirstOrDefault().RateTypeId))
            {
                foreach (var rate in rates)
                {
                    rate.IsActive = false;
                    _logisticProviderRateRepository.Update(rate);
                }
            }
            providerRate.IsActive = !providerRate.IsActive;
            _logisticProviderRateRepository.Update(providerRate);
        }
    }
}
