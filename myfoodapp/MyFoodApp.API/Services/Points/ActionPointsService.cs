using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class ActionPointsService : IActionPointsService
    {
        private readonly IActionPointsRepository _actionPointsRepository;

        public ActionPointsService(IActionPointsRepository actionPointsRepository)
        {
            _actionPointsRepository = actionPointsRepository;
        }
        public void Add(ActionPoints actionPoints) => _actionPointsRepository.Create(actionPoints);


        public ActionPoints Get(int id) => _actionPointsRepository.GetByKey(id);

        public ICollection<ActionPoints> GetAll() => _actionPointsRepository.GetAll();

        public void Update(ActionPoints actionPoints) => _actionPointsRepository.Update(actionPoints);
    }
}
