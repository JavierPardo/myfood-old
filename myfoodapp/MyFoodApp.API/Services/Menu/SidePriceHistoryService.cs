using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class SidePriceHistoryService : ISidePriceHistoryService
    {
        private readonly ISidePriceHistoryRepository _sidePriceHistoryRepository;

        public SidePriceHistoryService(ISidePriceHistoryRepository sidePriceHistoryRepository)
        {
            _sidePriceHistoryRepository = sidePriceHistoryRepository;
        }
        public void Add(SidePriceHistory client) => _sidePriceHistoryRepository.Create(client);

        public void Delete(long id) => _sidePriceHistoryRepository.DeleteByKey(id);

        public SidePriceHistory Get(long id) => _sidePriceHistoryRepository.GetByKey(id);

        public ICollection<SidePriceHistory> GetAll() => _sidePriceHistoryRepository.GetAll();

        public void Update(SidePriceHistory client) => _sidePriceHistoryRepository.Update(client);
    }
}
