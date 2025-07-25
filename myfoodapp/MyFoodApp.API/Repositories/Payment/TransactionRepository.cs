using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class TransactionRepository: EntityModelRepository<ClientTransaction, long>,ITransactionRepository
    {
        public TransactionRepository(DataContext dataContext, ILogger<ClientTransaction> logger):base(dataContext, logger)
        {

        }

        public ClientTransaction GetByEventId(long eventId)
        {
            return _dbSet.FirstOrDefault(t=>t.EventId==eventId);
        }

        public IEnumerable<ClientTransaction> GetTransactionsByBranchId(int branchId)
        {
            throw new System.NotImplementedException();
        }
    }
}