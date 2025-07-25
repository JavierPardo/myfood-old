using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class PointsExchangeService : IPointsExchangeService
    {
        private readonly IPointsExchangeRepository _pointsExchangeRepository;

        public PointsExchangeService(IPointsExchangeRepository pointsExchangeRepository)
        {
            _pointsExchangeRepository = pointsExchangeRepository;
        }
        public void Add(PointsExchange pointsExchange) => _pointsExchangeRepository.Create(pointsExchange);


        public PointsExchange Get(int id) => _pointsExchangeRepository.GetByKey(id);

        public ICollection<PointsExchange> GetAll() => _pointsExchangeRepository.GetAll();

        public void Update(PointsExchange pointsExchange) => _pointsExchangeRepository.Update(pointsExchange);
        public void UpdateActiveFlag(PointsExchange pointsExchange)
        {
            var dbPointsExchange = _pointsExchangeRepository.GetByKey(pointsExchange.Id);
            dbPointsExchange.IsActive = pointsExchange.IsActive;
            _pointsExchangeRepository.Update(dbPointsExchange);
        }

        public PointsExchange GetCurrentPointsExchange() => _pointsExchangeRepository.GetCurrentPointsExchange();

    }
}
