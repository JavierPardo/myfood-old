using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class ActionPointsHistoryService : IActionPointsHistoryService
    {
        private readonly IActionPointsHistoryRepository _actionPointsHistoryRepository;

        public ActionPointsHistoryService(IActionPointsHistoryRepository actionPointsHistoryRepository)
        {
            _actionPointsHistoryRepository = actionPointsHistoryRepository;
        }
        public void Add(ActionPointsHistory actionPointsHistory) => _actionPointsHistoryRepository.Create(actionPointsHistory);


        public ActionPointsHistory Get(int id) => _actionPointsHistoryRepository.GetByKey(id);

        public ICollection<ActionPointsHistory> GetAll() => _actionPointsHistoryRepository.GetAll();

        public void Update(ActionPointsHistory actionPointsHistory) => _actionPointsHistoryRepository.Update(actionPointsHistory);
    }
}
