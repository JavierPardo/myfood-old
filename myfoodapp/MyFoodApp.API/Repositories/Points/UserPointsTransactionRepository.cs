using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class UserPointsTransactionRepository : EntityModelRepository<UserPointsTransaction, int>, IUserPointsTransactionRepository
    {
        public UserPointsTransactionRepository(DataContext context, ILogger<UserPointsTransaction> logger) : base(context, logger)
        {
        }

        public ICollection<UserPointsTransaction> GetAllUserPointsTransactionsByDate(DateTime? startDate, DateTime? endDate)
        {
            var ret = _dbSet.ToList();
            if (startDate != null)
                ret = ret.Where(p => p.Date >= startDate).ToList();
            if (endDate != null)
                ret = ret.Where(p => p.Date <= endDate).ToList();
            return ret;
        }
        public ICollection<UserPointsTransaction> GetUserPointsTransactionByUserId(long userId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var ret = _dbSet.Where(p => p.UserId == userId).ToList();
            if (startDate != null)
                ret = ret.Where(p => p.Date >= startDate).ToList();
            if (endDate != null)
                ret = ret.Where(p => p.Date <= endDate).ToList();
            return ret;
        }
        public int GetUserPointsTotalByUserId(long userId, DateTime? startDate, DateTime? endDate)
        {
            var ret = _dbSet.Where(p => p.UserId == userId).ToList();
            if (startDate == null || startDate < DateTime.Today.AddYears(-1))  //limitar puntos válidos a un año
                startDate = DateTime.Today.AddYears(-1);
                ret = ret.Where(p => p.Date >= startDate).ToList();
            if (endDate != null)
                ret = ret.Where(p => p.Date <= endDate).ToList();
            return ret.Sum(p => p.Points);
        }

    }
}