using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ItemsSidesService : IItemsSidesService
    {
        private readonly IItemsSidesRepository _itemsSidesRepository;

        public ItemsSidesService(IItemsSidesRepository itemsSidesRepository)
        {
            _itemsSidesRepository = itemsSidesRepository;
        }
        public void Add(ItemsSides client) => _itemsSidesRepository.Create(client);

        public void Delete(long id) => _itemsSidesRepository.DeleteByKey(id);

        public ItemsSides Get(long id) => _itemsSidesRepository.GetByKey(id);

        public ICollection<ItemsSides> GetAll() => _itemsSidesRepository.GetAll();

        public void Update(ItemsSides client) => _itemsSidesRepository.Update(client);
    }
}
