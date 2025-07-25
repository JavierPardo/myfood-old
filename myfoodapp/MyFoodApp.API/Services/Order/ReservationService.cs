using Microsoft.AspNetCore.Identity;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly IUserSession _userSession;
        private readonly IReservationStatusHistoryRepository _reservationStatusHistoryRepository;
        public ReservationService(IReservationRepository reservationRepository, IUserRepository userRepository, UserManager<User> userManager, IUserSession userSession, IReservationStatusHistoryRepository reservationStatusHistoryRepository)
        {
            _reservationRepository = reservationRepository;
            _userRepository = userRepository;
            _userManager = userManager;
            _userSession = userSession;
            _reservationStatusHistoryRepository = reservationStatusHistoryRepository;

        }
        
        public void Add(Reservation reservation) 
        {
            reservation.RequestedDateTime = DateTime.Now.Date;
            reservation.BranchId = _userSession.BranchId;
            if(reservation.UserId == 0) {
                reservation.UserId = _userSession.GetUserId();
            }
            _reservationRepository.Create(reservation);
        }
        public void Update(Reservation reservation) => _reservationRepository.Update(reservation);
        public async Task<Reservation> Get(long id) {
            var reservation = _reservationRepository.GetByKey(id);
            var filledUser = await FillUserReservation(reservation.UserId);
            reservation.User =filledUser;
            return reservation;
        }

        public Reservation UpdateStatus(long orderId, int status)
        {
            var reservation = _reservationRepository.GetByKey(orderId);
            reservation.CurrentStatusId = status;
            _reservationStatusHistoryRepository.Create(new ReservationStatusHistory
            {
                ReservationId = reservation.Id,
                AdminUserId = _userSession.GetUserId(),
                ChangeDateTime = DateTime.Now,
                StatusId = status
            });
            _reservationRepository.Update(reservation);
            return reservation;
        }


        public IEnumerable<Reservation> GetReservationsByDateAndStatusId(IEnumerable<int> statusIds, DateTime reservationDate)
        {
            return _reservationRepository.GetReservationsByDateAndStatusId(statusIds, reservationDate);
        }

        public ICollection<Reservation> GetAll() {
            ICollection<Reservation> reservations = (ICollection<Reservation>)_reservationRepository.GetAll();
            foreach (Reservation reservation in reservations)
            {
                User user = FillUserReservation(reservation.UserId).Result;
                reservation.User = user;
            }

            return reservations;
        } 
        public void Delete(long id) => _reservationRepository.DeleteByKey(id);

        public IEnumerable<Reservation> GetReservationsByBranchId(int branchId)
        {
            return _reservationRepository.GetReservationsByBranchId(branchId);
        }
        private async Task<User> FillUserReservation(long userId)
        {
            var user = _userRepository.GetByKey(userId);
            var userApp = await _userManager.FindByIdAsync(user.Id.ToString());
            var roles = await _userManager.GetRolesAsync(userApp);
            
            if(!roles.Contains("User")) {
                return null;
            }
            var userToReturn = new User();
            userToReturn.Id = user.Id;
            userToReturn.FirstName = user.FirstName;
            userToReturn.LastName = user.LastName;
            userToReturn.PhoneNumber = user.PhoneNumber;
            userToReturn.Email = user.Email;
            
            return userToReturn;
        }

        public void AddUserReservation(Reservation reservation)
        {
            reservation.RequestedDateTime = DateTime.Now.Date;
            reservation.UserId = _userSession.GetUserId();
            reservation.CurrentStatusId = 1;// to be confirmed
            _reservationRepository.Create(reservation);
        }

        public IEnumerable<Reservation> GetUserReservations()
        {
            long userId = _userSession.GetUserId();
            return _reservationRepository.GetAllByUser(userId);
        }
  }
}
