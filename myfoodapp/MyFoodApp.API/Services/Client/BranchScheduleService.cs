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
    public class BranchScheduleService : IBranchScheduleService
    {
        private readonly IUserSession _userSession;
        private readonly IMapper _mapper;
        private readonly IBranchScheduleRepository _branchScheduleRepository;               

        public BranchScheduleService(IBranchScheduleRepository branchScheduleRepository,
            IUserSession userSession,
            IMapper mapper)
        {
            _userSession = userSession;
            _mapper = mapper;
            _branchScheduleRepository = branchScheduleRepository;        
        }
        public void Add(BranchSchedule branchSchedule) => _branchScheduleRepository.Create(branchSchedule);

        public void Delete(int id) => _branchScheduleRepository.DeleteByKey(id);

        public BranchSchedule Get(int id) => _branchScheduleRepository.GetByKey(id);
        
        public ICollection<BranchSchedule> GetAll() => _branchScheduleRepository.GetAll();

        public IEnumerable<BranchSchedule> GetAllByBranchId(int branchId)
        {
            return _branchScheduleRepository.GetAllByBranchId(branchId);
        }
        public IEnumerable<BranchSchedule> GetByBranchAndDate(int branchId, string strDate)
        {
            return _branchScheduleRepository.GetByBranchAndDate(branchId, strDate);
        }

        public void Update(BranchSchedule branchSchedule) => _branchScheduleRepository.Update(branchSchedule);

    }
}
