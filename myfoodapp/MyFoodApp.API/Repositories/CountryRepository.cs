


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
    public class CountryRepository : EntityModelRepository<Country, int>, ICountryRepository
    {
        public CountryRepository(DataContext context, ILogger<Country> logger) : base(context, logger)
        {
        }
    }
}