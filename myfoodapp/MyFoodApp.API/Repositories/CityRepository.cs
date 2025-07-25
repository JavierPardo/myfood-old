using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class CityRepository : EntityModelRepository<City, int>, ICityRepository
    {
        public CityRepository(DataContext context, ILogger<City> logger) : base(context, logger)
        {
        }
    }
}