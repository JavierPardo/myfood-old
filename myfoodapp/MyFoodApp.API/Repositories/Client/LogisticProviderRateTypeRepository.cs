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
    public class LogisticProviderRateTypeRepository : EntityModelRepository<LogisticProviderRateType, int>, ILogisticProviderRateTypeRepository
    {
        public LogisticProviderRateTypeRepository(DataContext context, ILogger<LogisticProviderRateType> logger) : base(context, logger)
        {
        }
    }
}