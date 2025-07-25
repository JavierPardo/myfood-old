using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class TransactionStatusHistoryRepository : EntityModelRepository<TransactionStatusHistory, long>, ITransactionStatusHistoryRepository
    {
        public TransactionStatusHistoryRepository(DataContext context, ILogger<TransactionStatusHistory> logger) : base(context, logger)
        {
        }

        public TransactionStatusHistory GetStatusHistoryByTransactionId(long id)
        {
            return _dbSet.FirstOrDefault(x => x.TransactionId==id);
        }
    }
}
