using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.Operations;
using MyFoodApp.API.Repositories;

namespace MyFoodApp.API.Services
{
    public class BranchService : IBranchService
    {
        private readonly ILogisticProviderRepository _logisticProviderRepository;
        private readonly IBranchLogisticProviderRepository _branchLogisticProviderRepository;
        private readonly IBranchPreferenceRepository _branchPreferenceRepository;
        private readonly IUserSession _userSession;
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly IBranchRepository _branchRepository;
        private readonly IBranchesGroupsRepository _branchesGroupsRepository;
        private readonly IBranchesEventTypesRepository _branchesEventTypesRepository;
        private readonly IImagesStorage _imagesStorage;

        public BranchService(IBranchRepository branchRepository,
            IBranchesGroupsRepository branchesGroupsRepository,
            IBranchesEventTypesRepository branchesEventTypesRepository,
            IBranchPreferenceRepository branchPreferenceRepository,
            IClientRepository clientRepository,
            IBranchLogisticProviderRepository branchLogisticProviderRepository,
            IUserSession userSession,
            ILogisticProviderRepository logisticProviderRepository,
            IImagesStorage imagesStorage,
            IMapper mapper)
        {
            _logisticProviderRepository = logisticProviderRepository;
            _branchLogisticProviderRepository = branchLogisticProviderRepository;
            _branchPreferenceRepository = branchPreferenceRepository;
            _userSession = userSession;
            _clientRepository = clientRepository;
            _mapper = mapper;
            _branchRepository = branchRepository;
            _branchesGroupsRepository = branchesGroupsRepository;
            _branchesEventTypesRepository = branchesEventTypesRepository;
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("branch");
        }
        public void Add(Branch client)
        {
            client.ClientId = _userSession.ClientId;
            client.Client = null;
            _branchRepository.Create(client);
        }

        public void Delete(int id) => _branchRepository.DeleteByKey(id);

        public Branch Get(int id) => _branchRepository.GetByKey(id);

        public IEnumerable<Branch> GetAllByClientId(int clientId)
        {
            return _branchRepository.GetAllByClientId(clientId).Select(e =>
            {
                e.BannerUrl = _imagesStorage.GetImage($"banner_{e.Id.EncodeAsBase32String()}");
                e.LogoUrl = _imagesStorage.GetImage($"logo_{e.Id.EncodeAsBase32String()}");
                return e;
            });
        }

        public IEnumerable<Branch> GetAllByTags(string[] tags)
        {
            return _branchRepository.GetAllByTags(tags).Select(e =>
            {
                e.BannerUrl = _imagesStorage.GetImage($"banner_{e.Id.EncodeAsBase32String()}");
                e.LogoUrl = _imagesStorage.GetImage($"logo_{e.Id.EncodeAsBase32String()}");
                return e;
            });
        }
        public IEnumerable<Branch> GetAllWithClients()
        {
            return _branchRepository.GetAllWithClients().Select(x =>
            {
                x.Client.Branches = null;
                x.BannerUrl = _imagesStorage.GetImage($"banner_{x.Id.EncodeAsBase32String()}");
                x.LogoUrl = _imagesStorage.GetImage($"logo_{x.Id.EncodeAsBase32String()}");
                return x;
            });
        }
        public IEnumerable<Branch> GetAllByGroupId(int groupId)
        {
            return _branchesGroupsRepository.GetBranchesGroupsByGroupId(groupId).Select(e => {
                e.Branch.BannerUrl = _imagesStorage.GetImage($"banner_{e.Branch.Id.EncodeAsBase32String()}");
                e.Branch.LogoUrl = _imagesStorage.GetImage($"logo_{e.Branch.Id.EncodeAsBase32String()}");
                return e.Branch;
            });
        }

        public IEnumerable<Branch> GetAllByEventTypeId(int eventTypeId, int branchGroupId)
        {
            return _branchesEventTypesRepository.GetBranchesEventTypesByEventTypeId(eventTypeId,branchGroupId).Select(e =>
            {
                e.Branch.BannerUrl = _imagesStorage.GetImage($"banner_{e.Branch.Id.EncodeAsBase32String()}");
                e.Branch.LogoUrl = _imagesStorage.GetImage($"logo_{e.Branch.Id.EncodeAsBase32String()}");
                return e.Branch;
            });
        }
        public IEnumerable<Branch> GetAllByNameOrTags(string searchCriteria)
        {
            return _branchRepository.GetBranchByNameOrTags(searchCriteria.ToLower()).Select(b => {
                b.BannerUrl = _imagesStorage.GetImage($"banner_{b.Id.EncodeAsBase32String()}");
                b.LogoUrl = _imagesStorage.GetImage($"logo_{b.Id.EncodeAsBase32String()}");
                return b;
            });
        }

        public BranchDto GetCurrent()
        {
            var branch = _branchRepository.GetBranchClientById(_userSession.BranchId);
            if (branch == null)
                return null;
            //if()
            branch.BranchesEventTypes = branch.BranchesEventTypes.Select(x =>
            {
                x.Branch = null;
                x.BranchId = 0;
                x.EventType = null;
                return x;
            });
            var branchProvider = _logisticProviderRepository.GetByBranchIdDefault(_userSession.BranchId);
            
            branch.BannerUrl = _imagesStorage.GetImage($"banner_{_userSession.BranchId.EncodeAsBase32String()}");
            branch.LogoUrl = _imagesStorage.GetImage($"logo_{_userSession.BranchId.EncodeAsBase32String()}");
            var branchInformation= _mapper.Map<BranchDto>(branch);
            branchInformation.LogisticProviderDefault = branchProvider;
            return branchInformation;
        }

        public void SaveInformation(BranchDto model)
        {
            var branch = _branchRepository.GetByKey(_userSession.BranchId);
            ClearEvenTypes(branch);
            branch.Name = model.BranchName;
            branch.NIT = model.NIT;
            branch.Address = model.Address;
            branch.Email = model.Email;
            branch.MobilePhone = model.MobilePhone;
            branch.Phone = model.Phone;
            branch.Website = model.Website;
            branch.Coordinates = model.Coordinates;
            branch.Whatsapp = model.Whatsapp;
            branch.BannerUrl = _imagesStorage.StoreImage($"banner_{_userSession.BranchId.EncodeAsBase32String()}", model.BannerUrl);
            branch.LogoUrl = _imagesStorage.StoreImage($"logo_{_userSession.BranchId.EncodeAsBase32String()}", model.LogoUrl);
            branch.BranchesEventTypes = model.BranchesEventTypes;
            _branchRepository.Update(branch);
            var client = _clientRepository.GetByKey(branch.ClientId);
            client.ClientName = model.ClientName;
            _clientRepository.Update(client);
            if (model.LogisticProviderDefault != null)
            {
                var branchLogisticProvider = _branchLogisticProviderRepository.GetByBranchIdLogisticProviderId(_userSession.BranchId, model.LogisticProviderDefault.Id);
                branchLogisticProvider.IsBranchDefault = true;
                _branchLogisticProviderRepository.Update(branchLogisticProvider);
            }
            else
            {
                var branchLogisticProvider = _branchLogisticProviderRepository.GetByBranchId(_userSession.BranchId);
                if (branchLogisticProvider == null)
                {
                    return;
                }
                branchLogisticProvider.IsBranchDefault = false;
                _branchLogisticProviderRepository.Update(branchLogisticProvider);
            }

        }

        private void ClearEvenTypes(Branch branch)
        {
            var branchEventTypes = _branchesEventTypesRepository.GetAllByBranchId(branch.Id);
            foreach (var branchEventType in branchEventTypes)
            {
                _branchesEventTypesRepository.DeleteByEntity(branchEventType);
            }
        }

        public void Update(Branch branch)
        {
            var clientData = _branchRepository.GetByKey(branch.Id);
            clientData.Name = branch.Name;
            clientData.ZoneId = branch.ZoneId;
            clientData.CountryId = branch.CountryId;
            clientData.CityId = branch.CityId;
            clientData.Zone = null;
            clientData.Country = null;
            clientData.City = null;
            clientData.IsActive = branch.IsActive;
            _branchRepository.Update(branch);
        }

        public void UpdateIsActive(Branch branch)
        {
            var branchData = _branchRepository.GetByKey(branch.Id);
            branchData.IsActive = branch.IsActive;
            _branchRepository.Update(branchData);
        }

        public IEnumerable<Branch> GetAllByEvetTypesAndCriteria(string criteria, string eventTypeList)
        {
            var branchEventTypes = _branchPreferenceRepository.GetAllByCriteriaTag(criteria?.ToLower()).Select(x => x.BranchId);
            return _branchRepository
                .GetAllByEventTypesAndCriteria(criteria?.ToLower(), eventTypeList?.Split(',').Select(x => x.DecodeFromBase32String<int>()).Where(x => x != 0))
                .Where(x => branchEventTypes.Contains(x.Id) || string.IsNullOrWhiteSpace(criteria) || (!string.IsNullOrWhiteSpace(x.Name) && x.Name.ToLower().Contains(criteria?.ToLower())))
                .Select(branch =>
                    {
                        branch.BannerUrl = _imagesStorage.GetImage($"banner_{_userSession.BranchId.EncodeAsBase32String()}");
                        branch.LogoUrl = _imagesStorage.GetImage($"logo_{_userSession.BranchId.EncodeAsBase32String()}");
                        branch.BranchExceptionDates.ForEach(x =>
                        {
                            x.Branch = null;
                            x.BranchId = 0;
                        });
                        branch.BranchPreferences.ForEach(x=>
                        {
                            x.Branch = null;
                            x.BranchId = 0;
                        });
                        if (branch.Coordinates == "null")
                        {
                            branch.Coordinates = null;
                        }
                        branch.BranchesEventTypes = branch.BranchesEventTypes.Select(x =>
                        {
                            x.Branch = null;
                            x.EventType = null;
                            return x;
                        });
                        return branch;
                    });
        }
    }
}
