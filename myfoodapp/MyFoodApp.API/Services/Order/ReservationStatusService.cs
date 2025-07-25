using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ReservationStatusService : IReservationStatusService
    {
        private readonly IReservationStatusRepository _reservationStatusRepository;

        public ReservationStatusService(IReservationStatusRepository reservationStatusRepository)
        {
            _reservationStatusRepository = reservationStatusRepository;

        }
        
        public void Add(ReservationStatus reservationStatus) => _reservationStatusRepository.Create(reservationStatus);
        public void Update(ReservationStatus reservationStatus) => _reservationStatusRepository.Update(reservationStatus);
        public ReservationStatus Get(int id) => _reservationStatusRepository.GetByKey(id);
        public ICollection<ReservationStatus> GetAll() => _reservationStatusRepository.GetAll();
        public void Delete(int id) => _reservationStatusRepository.DeleteByKey(id);
    }
}
