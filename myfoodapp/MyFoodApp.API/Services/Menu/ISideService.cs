using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ISideService
    {
        void Add(Side side);
        void Update(Side side);
        Side Get(long id);
        IEnumerable<Side> GetAll();
        void Delete(long id);
        IEnumerable<Side> GetItemsByIds(long[] idList);
        IEnumerable<Side> GetSidesByOrderId(long orderId);
        IEnumerable<Side> GetSidesByEventId(long eventId);
        void UpdateIsActiveFlag(Side side);
  }
}
