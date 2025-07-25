using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ReservationStatusHistoryService : IReservationStatusHistoryService
    {
        private readonly IReservationStatusHistoryRepository _reservationStatusHistoryRepository;

        public ReservationStatusHistoryService(IReservationStatusHistoryRepository reservationStatusHistoryRepository)
        {
            _reservationStatusHistoryRepository = reservationStatusHistoryRepository;

        }
        
        public void Add(ReservationStatusHistory reservationStatusHistory) => _reservationStatusHistoryRepository.Create(reservationStatusHistory);
        public void Update(ReservationStatusHistory reservationStatusHistory) => _reservationStatusHistoryRepository.Update(reservationStatusHistory);
        public ReservationStatusHistory Get(long id) => _reservationStatusHistoryRepository.GetByKey(id);
        public ICollection<ReservationStatusHistory> GetAll() => _reservationStatusHistoryRepository.GetAll();
        public void Delete(long id) => _reservationStatusHistoryRepository.DeleteByKey(id);

        public ReservationStatusHistory GetStatusHistoryByReservationId(long id)
        {
            return _reservationStatusHistoryRepository.GetStatusHistoryByReservationId(id);
        }
    }
}
