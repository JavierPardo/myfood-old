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
    public class PointsExchangeRepository : EntityModelRepository<PointsExchange, int>, IPointsExchangeRepository
    {
        public PointsExchangeRepository(DataContext context, ILogger<PointsExchange> logger) : base(context, logger)
        {
        }
        public PointsExchange GetCurrentPointsExchange()
        {
            return _dbSet.Where(p => p.IsActive && (p.StartDate <= DateTime.Now) && (p.EndDate == null || p.EndDate >= DateTime.Now)).FirstOrDefault();
        }
    }
}