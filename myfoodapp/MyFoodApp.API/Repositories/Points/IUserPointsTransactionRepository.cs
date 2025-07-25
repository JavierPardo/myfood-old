using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserPointsTransactionRepository:IEntityModelRepository<UserPointsTransaction, int>
    {
        ICollection<UserPointsTransaction> GetUserPointsTransactionByUserId(long userId, DateTime? startDate, DateTime? endDate);
        ICollection<UserPointsTransaction> GetAllUserPointsTransactionsByDate(DateTime? startDate, DateTime? endDate);
        int GetUserPointsTotalByUserId(long userId, DateTime? startDate, DateTime? endDate);
    }    
}
