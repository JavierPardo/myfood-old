using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ISidePriceHistoryService
    {
        void Add(SidePriceHistory sidePriceHistory);
        void Update(SidePriceHistory sidePriceHistory);
        SidePriceHistory Get(long id);
        ICollection<SidePriceHistory> GetAll();
        void Delete(long id);
    }
}
