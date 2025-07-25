using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class LogisticProviderService : ILogisticProviderService
    {
        private readonly ICountryRepository _countryRepository;
        private readonly ILogisticProviderBranchRepository _logisticProviderBranchRepository;
        private readonly ILogisticProviderRateRepository _logisticProviderRateRepository;
        private readonly IUserSession _userSession;
        private readonly ILogisticProviderRepository _logisticProviderRepository;
        private readonly IBranchRepository _branchRepository;

        public LogisticProviderService(
            ILogisticProviderRepository logisticProviderRepository,
            IBranchRepository branchRepository,
            ILogisticProviderBranchRepository logisticProviderBranchRepository,
            ILogisticProviderRateRepository logisticProviderRateRepository,
            ICountryRepository countryRepository,
            IUserSession userSession)
        {
            _countryRepository = countryRepository;
            _logisticProviderBranchRepository = logisticProviderBranchRepository;
            _logisticProviderRateRepository = logisticProviderRateRepository;
            _userSession = userSession;
            _logisticProviderRepository = logisticProviderRepository;
            _branchRepository = branchRepository;
        }
        public void Add(LogisticProvider logisticProvider)
        {
            var country=_countryRepository.GetByKey(26);
            logisticProvider.CountryId = country.Id;
            if (!logisticProvider.IsActive)
            {
                logisticProvider.BranchLogisticProviders.ForEach(x => x.IsBranchDefault = false);
            }
            _logisticProviderRepository.Create(logisticProvider);

            foreach (var branchLogisticProvider in logisticProvider.BranchLogisticProviders.Where(x=>x.IsBranchDefault))
            {
                branchLogisticProvider.LogisticProvider = null;
                UpdateDefaultFlag(branchLogisticProvider);
            }

        }

        public void Delete(int id) => _logisticProviderRepository.DeleteByKey(id);

        public LogisticProvider Get(int id) 
        {           
            return _logisticProviderRepository.GetWithLogisticProviderByKeyAndClientId(id, _userSession.ClientId);
        }

        public IEnumerable<LogisticProvider> GetAll()
        {
            return _logisticProviderRepository.GetAllByBranchId(_userSession.BranchId);
        }

        public IEnumerable<LogisticProvider> GetAllByBranch()
        {
            var providers = _logisticProviderRepository.GetAllByBranchId(_userSession.BranchId);
            providers.ForEach(x =>
            x.BranchLogisticProviders.ForEach(y =>
            y.LogisticProvider = null)
            );
            return providers;
        }

        public IEnumerable<LogisticProvider> GetAllByClient()
        {
            var providers = _logisticProviderRepository.GetAllByClientId(_userSession.ClientId);
            return providers;
        }

        public void Update(LogisticProvider logisticProvider)
        {
            _logisticProviderRepository.Update(logisticProvider);

            if (!logisticProvider.IsActive)
            {
                _logisticProviderBranchRepository.DeActivateLogisticProvider(logisticProvider.Id);
            }
            UpdateDefaultFlag(logisticProvider.BranchLogisticProviders.First());
        }

        public void UpdateActiveFlag(LogisticProvider logisticProvider)
        {
            var dbProvider = _logisticProviderRepository.GetByKey(logisticProvider.Id);
            dbProvider.IsActive = logisticProvider.IsActive;
            _logisticProviderRepository.Update(dbProvider);
            if (!logisticProvider.IsActive)
            {
            _logisticProviderBranchRepository.DeActivateLogisticProvider(logisticProvider.Id);

            }
        }
        public void UpdateDefaultFlag(BranchLogisticProvider branchLogisticProvider)
        {
            var dbLogisticProviderBranch = _logisticProviderBranchRepository.GetDefaultByBranchId(branchLogisticProvider.BranchId);
            if (dbLogisticProviderBranch != null) {
                dbLogisticProviderBranch.IsBranchDefault = false;
                _logisticProviderBranchRepository.Update(dbLogisticProviderBranch);
            }
            dbLogisticProviderBranch = _logisticProviderBranchRepository.GetByBranchIdAndLogisticProvider(branchLogisticProvider.BranchId, branchLogisticProvider.LogisticProviderId);
            dbLogisticProviderBranch.IsBranchDefault = branchLogisticProvider.IsBranchDefault;
            _logisticProviderBranchRepository.Update(dbLogisticProviderBranch);
        }
    }
}
