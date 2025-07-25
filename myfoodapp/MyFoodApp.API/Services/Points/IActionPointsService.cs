using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IActionPointsService
    {
        void Add(ActionPoints actionPoints);
        void Update(ActionPoints actionPoints);
        ActionPoints Get(int id);
        ICollection<ActionPoints> GetAll();        
    }
}
