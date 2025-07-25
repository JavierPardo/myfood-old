using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserPointsTransactionService
    {
        void Add(UserPointsTransaction userPointsTx);
        void Update(UserPointsTransaction userPointsTx);
        UserPointsTransaction Get(int id);
        ICollection<UserPointsTransaction> GetAll();
        ICollection<UserPointsTransaction> GetAllUserPointsTransactionsByDate(DateTime? startDate, DateTime? endDate);
        ICollection<UserPointsTransaction> GetUserPointsTransactionByUserId(long userId, DateTime? startDate, DateTime? endDate);
        int GetUserPointsTotalByUserId(long userId, DateTime? startDate, DateTime? endDate);
    }
}
