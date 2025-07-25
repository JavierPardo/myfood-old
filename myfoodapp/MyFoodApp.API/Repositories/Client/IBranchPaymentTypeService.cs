using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchPaymentTypeService
    {
        void Add(BranchesPaymentTypes branchesPaymentTypes);
        void Update(BranchesPaymentTypes branchesPaymentTypes);
        BranchesPaymentTypes Get(int id);
        ICollection<BranchesPaymentTypes> GetAll();
        void Delete(int id);
    }
}
