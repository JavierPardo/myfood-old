using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchPreferenceService
    {
        void Add(BranchPreferences branchPreferences);
        void Update(BranchPreferences branchPreferences);
        BranchPreferences Get(int id);
        decimal GetBranchEventCommisionPct(int branchId, int eventTypeId, int paymentTypeId);
        decimal GetBranchReservationCommisionAmount(int branchId);
        BranchPreferences GetByBranchIdAndName(int branchId, string name);
        IEnumerable<BranchPreferences> GetByBranchId(int branchId);
        void Delete(int id);
        IEnumerable<BranchPreferences> GetAll();
    }
}
