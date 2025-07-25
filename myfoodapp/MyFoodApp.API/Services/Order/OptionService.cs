using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class OptionService : IOptionService
    {
        private readonly IOptionRepository _optionRepository;
        private readonly IMapper _mapper;
        private readonly IUserSession _userSession;

        public OptionService(IOptionRepository optionRepository, IMapper mapper, IUserSession userSession)
        {
            _optionRepository = optionRepository;
            _mapper = mapper;
            _userSession = userSession;
        }
        public void Add(Option option) {
            option.BranchId = _userSession.BranchId;
            _optionRepository.Create(option); 
        }

        public void Delete(long id) => _optionRepository.DeleteByKey(id);

        public Option Get(long id) => _optionRepository.GetByKey(id);

        public ICollection<Option> GetAll() => _optionRepository.GetAll();

        public ICollection<Option> GetByIdList(IEnumerable<long> idList)
        {
            return _optionRepository.GetAllByIds(idList);
        }

        public ICollection<Option> GetByItem(long itemId)
        {
            return _optionRepository.GetAllByItem(itemId);
        }

        public ICollection<Option> GetOptionsByOrderId(long orderId)
        {
            return _optionRepository.GetAllByOrderId(orderId);
        }

        public void Update(Option client) => _optionRepository.Update(client);

        public void UpdateSome(OptionDto optionDTO, long id)
        {
            var model = _mapper.Map<Option>(optionDTO);
            var itemData = _optionRepository.GetByKey(id);
            
            if (optionDTO.IsActive.HasValue)
            {
                itemData.IsActive = model.IsActive;
            }

            _optionRepository.Update(itemData);
        }
    }
}
