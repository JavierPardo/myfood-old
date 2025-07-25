using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemPriceHistoryRepository _itemPriceHistoryRepository;
        private readonly IImagesStorage _imagesStorage;
        private readonly IUserSession _userSession;
        private readonly IItemRepository _itemRepository;
        private readonly ICategoriesItemsRepository _categoriesItemsRepository;
        private readonly IItemsOptionsRepository _itemsOptionsRepository;
        private readonly IMapper _mapper;
        public ItemService(IItemRepository itemRepository,
            ICategoriesItemsRepository categoriesItemsRepository,
            IItemsOptionsRepository itemsOptionsRepository,
            IUserSession userSession,
            IMapper mapper,
            IItemPriceHistoryRepository itemPriceHistoryRepository,
            IImagesStorage imagesStorage)
        {
            _itemPriceHistoryRepository = itemPriceHistoryRepository;
            _imagesStorage = imagesStorage;
            _userSession = userSession;
            _itemRepository = itemRepository;
            _categoriesItemsRepository = categoriesItemsRepository;
            _itemsOptionsRepository = itemsOptionsRepository;
            _mapper = mapper;
            _imagesStorage.SetBucket("item");
        }
        public void Add(Item item)
        {
            item.BranchId = _userSession.BranchId;
            var imageDataUrl = item.Image;
            item.Image = string.Empty;
            _itemRepository.Create(item);
            _itemPriceHistoryRepository.Create(new ItemPriceHistory
            {
                AdminUserId = _userSession.GetUserId(),
                StartDate = DateTime.Now,
                ItemId = item.Id,
                Price = item.CurrentPrice
            });
            item.Image=_imagesStorage.StoreImage(item.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(long id) => _itemRepository.DeleteByKey(id);

        public Item Get(long id)
        {
            var item = _itemRepository.GetByKey(id);
            if (item != null)
            {
                item.Image = _imagesStorage.GetImage(id.EncodeAsBase32String());
            }
            return item;
        }

        public IEnumerable<Item> GetAll()
        {
            foreach (var item in _itemRepository.GetAll())
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Item> GetFilteredItems(long menu, long category, string query)
        {

            foreach (var item in  _itemRepository.GetByMenuAndCategoryAndQuery(menu, category, query))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
           
        }

        public IEnumerable<Item> GetItemsByBranchId(int branchId)
        {
            foreach (var item in _itemRepository.GetItemsByBranchId(branchId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Item> GetItemsByCategoryId(long categoryId)
        {
            foreach (var item in _itemRepository.GetItemsByCategoryId(categoryId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Item> GetItemsByIds(long[] ids)
        {
            foreach (var item in _itemRepository.GetAllById(ids))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Item> GetItemsByMenuId(long menuId)
        {
            foreach (var item in _itemRepository.GetItemsByMenuId(menuId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public void Update(Item item)
        {
            item.BranchId = _userSession.BranchId;
            CleanCategoriesItems(item.Id);
            CleanItemsOptions(item.Id);
            var imageBytes = item.Image;
            item.Image= string.Empty;
            _itemRepository.Update(item);
            var lastPriceItem = _itemPriceHistoryRepository.GetLastPriceHistoryByItemId(item.Id);
            if (lastPriceItem != null)
            {
                lastPriceItem.EndDate = DateTime.Now;
                _itemPriceHistoryRepository.Update(lastPriceItem);
            }
            _itemPriceHistoryRepository.Create(new ItemPriceHistory
            {
                AdminUserId = _userSession.GetUserId(),
                StartDate = DateTime.Now,
                ItemId = item.Id,
                Price = item.CurrentPrice
            });
            _imagesStorage.StoreImage(item.Id.EncodeAsBase32String(), imageBytes);
        }

        private void CleanCategoriesItems(long itemId)
        {
            var categoryItems = _categoriesItemsRepository.GetByItemId(itemId).ToList();
            foreach (var item in categoryItems)
            {
                _categoriesItemsRepository.DeleteByEntity(item);
            }                       
        }

        private void CleanItemsOptions(long itemId)
        {
            var categoryItems = _itemsOptionsRepository.GetByItemId(itemId).ToList();
            foreach (var item in categoryItems)
            {
                _itemsOptionsRepository.DeleteByEntity(item);
            }
        }

        public void UpdateSome(ItemDto itemDTO, long id)
        {
            var model = _mapper.Map<Item>(itemDTO);
            var itemData = _itemRepository.GetByKey(id);
            if (itemDTO.Image != null)
            {
                itemData.Image = model.Image;
            }

            if (itemDTO.IsActive.HasValue)
            {
                itemData.IsActive = model.IsActive;
            }

            if (itemDTO.IsVisibleInMenu.HasValue)
            {
                itemData.IsVisibleInMenu = model.IsVisibleInMenu;
            }

            _itemRepository.Update(itemData);
        }

        public Item GetWithRelations(long id)
        {
            var item =_itemRepository.GetByKey(id);            
            item.CategoriesItems= _categoriesItemsRepository.GetByItemId(id);
            item.ItemsOptions = _itemsOptionsRepository.GetByItemId(id);
            item.Image = _imagesStorage.GetImage(id.EncodeAsBase32String());
            return item;
        }

        public IEnumerable<Item> GetItemsByOrderId(long orderId)
        {
            foreach (var item in _itemRepository.GetAllByOrderId(orderId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Item> GetItemsByEventId(long eventId)
        {
            foreach (var item in _itemRepository.GetAllByEventId(eventId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

    public void Rearrange(Item[] items)
    {
        _itemRepository.UpdatePosition(items);
    }
  }
}
