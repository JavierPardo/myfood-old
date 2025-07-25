using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class SideService : ISideService
    {
        private readonly ISidePriceHistoryRepository _sidePriceHistoryRepository;
        private readonly IImagesStorage _imagesStorage;
        private readonly ISideRepository _sideRepository;
        private readonly IMapper _mapper;
        private readonly IUserSession _userSession;        

        public SideService(ISideRepository sideRepository, 
            IUserSession userSession, 
            IMapper mapper,
            ISidePriceHistoryRepository sidePriceHistoryRepository,
            IImagesStorage imagesStorage)
        {
            _sidePriceHistoryRepository = sidePriceHistoryRepository;
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("side");
            _sideRepository = sideRepository;
            _mapper = mapper;
            _userSession = userSession;
        }
        public void Add(Side side) {
            side.BranchId = _userSession.BranchId;
            var imageDataUrl = side.Image;
            _sideRepository.Create(side);

            _sidePriceHistoryRepository.Create(new SidePriceHistory
            {
                AdminUserId = _userSession.GetUserId(),
                StartDate = DateTime.Now,
                SideId = side.Id,
                Price = side.CurrentPrice
            });
            side.Image = _imagesStorage.StoreImage(side.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(long id) => _sideRepository.DeleteByKey(id);

        public Side Get(long id)
        {
            var side = _sideRepository.GetByKey(id);
            side.Image = _imagesStorage.GetImage(id.EncodeAsBase32String());
            return side;
        }

        public IEnumerable<Side> GetAll()
        {
            foreach (var item in _sideRepository.GetAll())
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Side> GetItemsByIds(long[] idList)
        {
            foreach (var item in _sideRepository.GetAllById(idList))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public IEnumerable<Side> GetSidesByEventId(long eventId)
        {
            foreach (var item in _sideRepository.GetAllByEventId(eventId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        //public IEnumerable<Side> GetSidesByItemId(long itemId)
        //{
        //    foreach (var item in _sideRepository.GetSidesByItemId(itemId))
        //    {
        //        item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
        //        yield return item;
        //    }
        //}

        public IEnumerable<Side> GetSidesByOrderId(long orderId)
        {
            foreach (var item in GetSidesByOrderId(orderId))
            {
                item.Image = _imagesStorage.GetImage(item.Id.EncodeAsBase32String());
                yield return item;
            }
        }

        public void Update(Side side) {
            var imageDataUrl = side.Image;
            _sideRepository.Update(side);

            var lastPriceSide = _sidePriceHistoryRepository.GetLastPriceHistoryBySideId(side.Id);
            if (lastPriceSide != null)
            {
                lastPriceSide.EndDate = DateTime.Now;
                _sidePriceHistoryRepository.Update(lastPriceSide);
            }
            _sidePriceHistoryRepository.Create(new SidePriceHistory
            {
                AdminUserId = _userSession.GetUserId(),
                StartDate = DateTime.Now,
                SideId = side.Id,
                Price = side.CurrentPrice
            });
            side.Image = _imagesStorage.StoreImage(side.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void UpdateIsActiveFlag(Side side)
        {
            var dbSide = _sideRepository.GetByKey(side.Id);
            dbSide.IsActive = side.IsActive;
            _sideRepository.Update(dbSide);
        }
    }
}
