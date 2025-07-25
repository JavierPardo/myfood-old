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
    public class ReservationSpecialEventService : IReservationSpecialEventService
    {
        private readonly IReservationSpecialEventRepository _reservationSpecialEventRepository;
        private readonly IImagesStorage _imagesStorage;
        private readonly IUserSession _userSession;

        public ReservationSpecialEventService(IReservationSpecialEventRepository reservationSpecialEventRepository,
            IImagesStorage imagesStorage, IUserSession userSession)
        {
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("reservation_special_event");
            _userSession = userSession;
            _reservationSpecialEventRepository = reservationSpecialEventRepository;
        }
        public void Add(ReservationSpecialEvent reservationSpecialEvent)
        {
            reservationSpecialEvent.BranchId=_userSession.BranchId;
            string imageDataUrl = reservationSpecialEvent.Image;
            _reservationSpecialEventRepository.Create(reservationSpecialEvent);
            reservationSpecialEvent.Image = _imagesStorage.StoreImage(reservationSpecialEvent.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(long id) => _reservationSpecialEventRepository.DeleteByKey(id);

        public ReservationSpecialEvent Get(long id)
        {
            var reservationSpecialEvent=_reservationSpecialEventRepository.GetByKey(id);
            reservationSpecialEvent.Image = _imagesStorage.GetImage(reservationSpecialEvent.Id.EncodeAsBase32String());
            return reservationSpecialEvent;
        }

        public IEnumerable<ReservationSpecialEvent> GetAll(bool activesOnly)
        {
            var specialEvents = activesOnly ? _reservationSpecialEventRepository.GetActives() : _reservationSpecialEventRepository.GetAll();
            foreach (var reservationSpecialEvent in specialEvents)
            {
                reservationSpecialEvent.Image = _imagesStorage.GetImage(reservationSpecialEvent.Id.EncodeAsBase32String());
                yield return reservationSpecialEvent;
            }            
        }

        public IEnumerable<ReservationSpecialEvent> GetFutureEvents()
        {
            foreach (var reservationSpecialEvent in _reservationSpecialEventRepository.GetFutureEvents())
            {
                reservationSpecialEvent.Image = _imagesStorage.GetImage(reservationSpecialEvent.Id.EncodeAsBase32String());
                yield return reservationSpecialEvent;
            }     
        }

    public ReservationSpecialEvent GetSpecialEventsByBranchId(int branchId)
        {
            var reservationSpecialEvent = _reservationSpecialEventRepository.GetSpecialEventsByBranchId(branchId);
            reservationSpecialEvent.Image = _imagesStorage.GetImage(reservationSpecialEvent.Id.EncodeAsBase32String());
            return reservationSpecialEvent;
        }

        public void Update(ReservationSpecialEvent reservationSpecialEvent)
        {
            string imageDataUrl = reservationSpecialEvent.Image;
            _reservationSpecialEventRepository.Update(reservationSpecialEvent);
            reservationSpecialEvent.Image= _imagesStorage.StoreImage(reservationSpecialEvent.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void UpdateIsActiveFlag(ReservationSpecialEvent reservationSpecialEvent)
        {
            var dbSpecialEvent = _reservationSpecialEventRepository.GetByKey(reservationSpecialEvent.Id);
            dbSpecialEvent.IsActive = reservationSpecialEvent.IsActive;
            _reservationSpecialEventRepository.Update(dbSpecialEvent);
        }
  }
}
