using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ItemsOptionsService : IItemsOptionsService
    {
        private readonly IItemsOptionsRepository _itemsOptionsRepository;

        public ItemsOptionsService(IItemsOptionsRepository itemsOptionsRepository)
        {
            _itemsOptionsRepository = itemsOptionsRepository;
        }
        public void Add(ItemsOptions client) => _itemsOptionsRepository.Create(client);

        public void Delete(long id) => _itemsOptionsRepository.DeleteByKey(id);

        public ItemsOptions Get(long id) => _itemsOptionsRepository.GetByKey(id);

        public ICollection<ItemsOptions> GetAll() => _itemsOptionsRepository.GetAll();

        public void Update(ItemsOptions client) => _itemsOptionsRepository.Update(client);
    }
}
