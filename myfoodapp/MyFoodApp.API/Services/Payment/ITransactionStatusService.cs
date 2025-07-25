using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface ITransactionStatusService
    {
        void Add(TransactionStatus transactionStatus);
        void Update(TransactionStatus transactionStatus);
        TransactionStatus Get(int id);
        ICollection<TransactionStatus> GetAll();
        void Delete(int id);
    }
}