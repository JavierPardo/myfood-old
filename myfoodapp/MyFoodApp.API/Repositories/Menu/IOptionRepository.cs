using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOptionRepository : IEntityModelRepository<Option, long>
    {
        ICollection<Option> GetAllByItem(long itemId);
        ICollection<Option> GetAllByIds(IEnumerable<long> idList);
        ICollection<Option> GetAllByOrderId(long orderId);
    }
}
