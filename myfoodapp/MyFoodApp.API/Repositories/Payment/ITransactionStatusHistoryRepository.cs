using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ITransactionStatusHistoryRepository : IEntityModelRepository<TransactionStatusHistory, long>
    {
        TransactionStatusHistory GetStatusHistoryByTransactionId(long id);
    }
}
