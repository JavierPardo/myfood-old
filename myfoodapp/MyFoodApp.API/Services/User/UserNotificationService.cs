using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class UserNotificationService : IUserNotificationService
    {
        private readonly IUserSession _userSession;
        private readonly IUserNotificationRepository _userNotificationRepository;

        public UserNotificationService(IUserNotificationRepository userNotificationRepository, 
            IUserSession userSession)
        {
            _userSession = userSession;
            _userNotificationRepository = userNotificationRepository;
        }
        public void Add(UserNotification client) => _userNotificationRepository.Create(client);

        public void Delete(long id) => _userNotificationRepository.DeleteByKey(id);

        public UserNotification Get(long id) => _userNotificationRepository.GetByKey(id);

        public ICollection<UserNotification> GetAll() => _userNotificationRepository.GetAll();

        public IEnumerable<UserNotification> GetNotifcationsByCurrentUserId()
        {
            return _userNotificationRepository.GetNotifcationsByUserId(_userSession.GetUserId());
        }

        public void MarkRead(IEnumerable<long> idList)
        {
            _userNotificationRepository.MarkAsReadById(idList);
        }

        public void Update(UserNotification client) => _userNotificationRepository.Update(client);
    }
}

