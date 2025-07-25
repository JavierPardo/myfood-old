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
    public class ActionPointsHistoryRepository : EntityModelRepository<ActionPointsHistory, int>, IActionPointsHistoryRepository
    {
        public ActionPointsHistoryRepository(DataContext context, ILogger<ActionPointsHistory> logger) : base(context, logger)
        {
        }
      
    }
}