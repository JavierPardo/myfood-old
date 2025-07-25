using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ITransactionStatusHistoryService
    {
        void Add(TransactionStatusHistory client);
        void Update(TransactionStatusHistory client);
        TransactionStatusHistory Get(long id);
        ICollection<TransactionStatusHistory> GetAll();
        void Delete(long id);
        TransactionStatusHistory GetStatusHistoryByTransactionId(long id);
    }
}
