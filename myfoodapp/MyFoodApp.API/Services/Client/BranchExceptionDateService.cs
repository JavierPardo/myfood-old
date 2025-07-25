using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class BranchExceptionDateService : IBranchExceptionDateService
    {
        private readonly IUserSession _userSession;
        private readonly IMapper _mapper;
        private readonly IBranchExceptionDateRepository _branchExceptionDateRepository;

        public BranchExceptionDateService(IBranchExceptionDateRepository branchExceptionDateRepository,
            IUserSession userSession,
            IMapper mapper)
        {
            _userSession = userSession;
            _mapper = mapper;
            _branchExceptionDateRepository = branchExceptionDateRepository;
        }
        public void Add(BranchExceptionDate exceptionDate)
        {
            exceptionDate.BranchId = _userSession.BranchId;
            _branchExceptionDateRepository.Create(exceptionDate);
        }

        public void Delete(int id) => _branchExceptionDateRepository.DeleteByKey(id);

        public BranchExceptionDate Get(int id) => _branchExceptionDateRepository.GetByKey(id);

        public ICollection<BranchExceptionDate> GetAll() => _branchExceptionDateRepository.GetAll();

        public IEnumerable<BranchExceptionDate> GetAllByBranchId(int branchId)
        {
            return _branchExceptionDateRepository.GetAllByBranchId(branchId);
        }

        public IEnumerable<BranchExceptionDate> GetByBranchAndDate(int branchId, string strDate)
        {
            return _branchExceptionDateRepository.GetByBranchAndDate(branchId, strDate);
        }

        public void Update(BranchExceptionDate exceptionDate)
        {
            exceptionDate.BranchId = _userSession.BranchId;
            _branchExceptionDateRepository.Update(exceptionDate);
        }

        public void UpdateIsClosed(BranchExceptionDate branchExceptionDate)
        {
            var exceptionDate= _branchExceptionDateRepository.GetByKey(branchExceptionDate.Id);
            exceptionDate.BranchId = _userSession.BranchId;
            exceptionDate.IsClosed = branchExceptionDate.IsClosed;
            _branchExceptionDateRepository.Update(exceptionDate);
        }
    }
}
