using Microsoft.AspNetCore.Mvc;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public interface IBranchGroupService
    {
        IEnumerable<BranchesGroups> GetAll();
        BranchesGroups GetByGroupId(int groupId);
        void Create(BranchesGroups branchesGroups);
        void Update(BranchesGroups branchesGroups);
        void Delete(BranchesGroups branchesGroups);
    }
}
