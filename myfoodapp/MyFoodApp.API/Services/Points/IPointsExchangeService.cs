using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IPointsExchangeService
    {
        void Add(PointsExchange pointsExchange);
        void Update(PointsExchange pointsExchange);
        PointsExchange Get(int id);
        ICollection<PointsExchange> GetAll();
        void UpdateActiveFlag(PointsExchange pointsExchange);
        PointsExchange GetCurrentPointsExchange();
    }
}
