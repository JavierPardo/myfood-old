using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ISideRepository : IEntityModelRepository<Side, long>
    {
        ICollection<Side> GetAllByBranch(int branchId);
        ICollection<Side> GetAllById(ICollection<long> idList);
        IEnumerable<Side> GetSidesByOrderId(long orderId);
        IEnumerable<Side> GetAllByEventId(long eventId);
    }
}
