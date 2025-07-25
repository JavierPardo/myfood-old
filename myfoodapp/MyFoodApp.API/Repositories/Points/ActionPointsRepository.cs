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
    public class ActionPointsRepository : EntityModelRepository<ActionPoints, int>, IActionPointsRepository
    {
        public ActionPointsRepository(DataContext context, ILogger<ActionPoints> logger) : base(context, logger)
        {
        }
      
    }
}