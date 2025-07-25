using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class TransactionStatusRepository: EntityModelRepository<TransactionStatus,int>,ITransactionStatusRepository
    {
        public TransactionStatusRepository(DataContext dataContext, ILogger<TransactionStatus> logger):base(dataContext, logger)
        {

        }
    }
}