using System.Collections.Generic;
using System.Transactions;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface ITransactionRepository : IEntityModelRepository<ClientTransaction, long>
    {
        IEnumerable<ClientTransaction> GetTransactionsByBranchId(int branchId);
        ClientTransaction GetByEventId(long eventId);
    }
}