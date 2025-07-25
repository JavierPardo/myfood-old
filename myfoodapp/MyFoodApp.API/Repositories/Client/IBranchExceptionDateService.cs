using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchExceptionDateService
    {
        void Add(BranchExceptionDate exceptionDate);
        void Update(BranchExceptionDate exceptionDate);
        BranchExceptionDate Get(int id);
        ICollection<BranchExceptionDate> GetAll();
        void Delete(int id);
        IEnumerable<BranchExceptionDate> GetAllByBranchId(int branchId);
        IEnumerable<BranchExceptionDate> GetByBranchAndDate(int branchId, string strDate);
        void UpdateIsClosed(BranchExceptionDate branchExceptionDate);
    }
}
