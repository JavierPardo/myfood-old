using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchService
    {
        void Add(Branch branch);
        void Update(Branch branch);
        Branch Get(int id);
        void Delete(int id);
        BranchDto GetCurrent();
        void SaveInformation(BranchDto model);
        IEnumerable<Branch> GetAllByClientId(int clientId);
        IEnumerable<Branch> GetAllWithClients();
        IEnumerable<Branch> GetAllByGroupId(int groupId);
        IEnumerable<Branch> GetAllByEventTypeId(int eventTypeId, int branchGroupId);
        IEnumerable<Branch> GetAllByNameOrTags(string tags);
        void UpdateIsActive(Branch branch);
        IEnumerable<Branch> GetAllByTags(string[] tags);
        IEnumerable<Branch> GetAllByEvetTypesAndCriteria(string criteria, string eventTypeList);
    }
}
