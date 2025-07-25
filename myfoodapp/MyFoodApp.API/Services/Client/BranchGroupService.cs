using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class BranchGroupService : IBranchGroupService
    {
        private readonly IBranchesGroupsRepository _branchesGroupsRepository;

        public BranchGroupService(IBranchesGroupsRepository branchesGroupsRepository)
        {
            _branchesGroupsRepository = branchesGroupsRepository;
        }
        public void Create(BranchesGroups branchGroup)
        {
            _branchesGroupsRepository.Create(branchGroup);
        }

        public void Delete(BranchesGroups branchesGroups)
        {
            _branchesGroupsRepository.DeleteByEntity(branchesGroups);
        }

        public IEnumerable<BranchesGroups> GetAll()
        {
            return _branchesGroupsRepository.GetAll();
        }

        public BranchesGroups GetByGroupId(int groupId)
        {
            var bg= _branchesGroupsRepository.GetByGroupId(groupId);
            bg.Branch.BranchesGroups = null;
            return bg;
        }

        public void Update(BranchesGroups branchGroup)
        {
            _branchesGroupsRepository.Update(branchGroup);
        }
    }
}
