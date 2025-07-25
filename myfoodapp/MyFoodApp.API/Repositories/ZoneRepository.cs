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
    public class ZoneRepository : EntityModelRepository<Zone, int>, IZoneRepository
    {
        public ZoneRepository(DataContext context, ILogger<Zone> logger) : base(context, logger)
        {
        }
    }
}
