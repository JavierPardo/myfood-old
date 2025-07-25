using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ItemPriceHistoryService : IItemPriceHistoryService
    {
        private readonly IItemPriceHistoryRepository _itemPriceHistoryRepository;

        public ItemPriceHistoryService(IItemPriceHistoryRepository itemPriceHistoryRepository)
        {
            _itemPriceHistoryRepository = itemPriceHistoryRepository;
        }
        public void Add(ItemPriceHistory client) => _itemPriceHistoryRepository.Create(client);

        public void Delete(long id) => _itemPriceHistoryRepository.DeleteByKey(id);

        public ItemPriceHistory Get(long id) => _itemPriceHistoryRepository.GetByKey(id);

        public ICollection<ItemPriceHistory> GetAll() => _itemPriceHistoryRepository.GetAll();

        public ItemPriceHistory GetPriceHistoryByItemId(long id)
        {
            return _itemPriceHistoryRepository.GetPriceHistoryByItemId(id);
        }

        public void Update(ItemPriceHistory client) => _itemPriceHistoryRepository.Update(client);
    }
}
