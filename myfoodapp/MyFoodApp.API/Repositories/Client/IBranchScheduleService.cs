using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchScheduleService
    {
        void Add(BranchSchedule branchSchedule);
        void Update(BranchSchedule branchSchedule);
        BranchSchedule Get(int id);
        ICollection<BranchSchedule> GetAll();
        void Delete(int id);
        IEnumerable<BranchSchedule> GetAllByBranchId(int branchId);
        IEnumerable<BranchSchedule> GetByBranchAndDate(int branchId, string strDate);
    }
}
