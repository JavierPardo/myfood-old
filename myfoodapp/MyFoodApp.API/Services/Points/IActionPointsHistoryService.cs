using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IActionPointsHistoryService
    {
        void Add(ActionPointsHistory actionPointsHistory);
        void Update(ActionPointsHistory actionPointsHistory);
        ActionPointsHistory Get(int id);
        ICollection<ActionPointsHistory> GetAll();        
    }
}
