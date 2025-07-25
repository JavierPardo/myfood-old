using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class UserPointsTransactionService : IUserPointsTransactionService
    {
        private readonly IUserPointsTransactionRepository _userPointsTransactionRepository;

        public UserPointsTransactionService(IUserPointsTransactionRepository userPointsTransactionRepository)
        {
            _userPointsTransactionRepository = userPointsTransactionRepository;
        }
        public void Add(UserPointsTransaction userPointsTx) => _userPointsTransactionRepository.Create(userPointsTx);


        public UserPointsTransaction Get(int id) => _userPointsTransactionRepository.GetByKey(id);

        public ICollection<UserPointsTransaction> GetAll() => _userPointsTransactionRepository.GetAll();

        public void Update(UserPointsTransaction userPointsTx) => _userPointsTransactionRepository.Update(userPointsTx);
        public ICollection<UserPointsTransaction> GetAllUserPointsTransactionsByDate(DateTime? startDate, DateTime? endDate)
        {
            return _userPointsTransactionRepository.GetAllUserPointsTransactionsByDate(startDate, endDate);
        }
        public ICollection<UserPointsTransaction> GetUserPointsTransactionByUserId(long userId, DateTime? startDate, DateTime? endDate)
        {
           return _userPointsTransactionRepository.GetUserPointsTransactionByUserId(userId, startDate, endDate);
        }
        public int GetUserPointsTotalByUserId(long userId, DateTime? startDate, DateTime? endDate)
        {
            return _userPointsTransactionRepository.GetUserPointsTotalByUserId(userId, startDate, endDate);
        }
    }
}
